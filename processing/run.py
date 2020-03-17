from flask import Flask, render_template, jsonify,send_file,request
from random import *
from flask_cors import CORS
import requests
import numpy as np
from cv2 import cv2
from PIL import Image
from werkzeug.utils import secure_filename
import os
import pandas as pd
from webhook import issue

app = Flask(__name__,
            static_folder = "./dist/static",
            template_folder = "./dist")
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/random')
def random_number():
    response = {
        'randomNumber': randint(1, 100)
    }
    return jsonify(response)

@app.route('/api/upload',methods=["POST"])
def upload():
    # file=request.files['temp']
    f=request.files['temp']
    tempname=request.form['tempname']
    temp_path='../templates/'
    name = f.filename.replace(' ','_')
    # print(tempname)
    f.save(secure_filename(f.filename))

    inputImage = cv2.imread(name)
    inputImageGray = cv2.cvtColor(inputImage, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(inputImageGray,150,200,apertureSize = 3)

    # print(edges)
    edges = abs(cv2.subtract(255,edges))

    minLineLength = 30
    maxLineGap = 5
    lines = cv2.HoughLinesP(edges,cv2.HOUGH_PROBABILISTIC, np.pi/180, 30, minLineLength,maxLineGap)
    for x in range(0, len(lines)):
        for x1,y1,x2,y2 in lines[x]:
            pts = np.array([[x1, y1 ], [x2 , y2]], np.int32)
            cv2.polylines(inputImage, [pts], True, (0,255,0))

    font = cv2.FONT_HERSHEY_SIMPLEX
    cv2.putText(inputImage,"Tracks Detected", (500, 250), font, 0.5, 255)
    
    os.remove(name)

    filename=tempname+'.png'    
    
    #Following converts white pixels to transparent
    imagePIL = Image.fromarray(edges)
    imagePIL = imagePIL.convert("RGBA")
    datas = imagePIL.getdata()
    
    newData = []
    for item in datas:
        if item[0] == 255 and item[1] == 255 and item[2] == 255:
            newData.append((255, 255, 255, 0))
        else:
            if item[0] > 150:
                newData.append((0, 0, 0, 255))
            else:
                newData.append(item)
    
    
    imagePIL.putdata(newData)
    imagePIL.save(temp_path+filename, "PNG")    
    
    return send_file(temp_path+filename,mimetype='image/png')


def getColour(csv,R,G,B):
    minimum = 10000
    for i in range(len(csv)):
        d = abs(R- int(csv.loc[i,"R"])) + abs(G- int(csv.loc[i,"G"]))+ abs(B- int(csv.loc[i,"B"]))
        if(d<=minimum):
            minimum = d
            cname = csv.loc[i,"color_name"]
            hex_code = csv.loc[i,"hex"]
    return (cname,hex_code)


@app.route('/api/picktool',methods=['GET','POST'])
def picktool():
    img = Image.open(request.files['image'])
    img = np.array(img)
    img = cv2.cvtColor(np.array(img), cv2.COLOR_BGR2RGB)

    x,y,z = np.shape(img)
    # r = g = b = 0
    xpos = int(request.values['xpos'])
    ypos = int(request.values['ypos'])
    
    if(xpos<x and ypos<y):
        index = ["color", "color_name", "hex", "R", "G", "B"]
        csv = pd.read_csv('colors.csv', names=index, header=None)

        b,g,r = img[xpos, ypos]
        b = int(b)
        g = int(g)
        r = int(r)

        name,hex_code = getColour(csv,r, g, b) 
        colour_info = {'name':name , 'hex':hex_code}
        return jsonify(colour_info)
    else:
        return jsonify({'name':'NONE' , 'hex':'-9999'})

@app.route('/issue/template', methods=['POST'])
def check_issue():
    text = request.json['text']
    return jsonify(match=issue.template_match(text))

if __name__ == '__main__':
  app.run(host='127.0.0.1', port=5000, debug=True)
 
