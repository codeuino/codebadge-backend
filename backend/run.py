from flask import Flask, render_template, jsonify,send_file,request
from random import *
from flask_cors import CORS
import requests
import numpy as np
from cv2 import cv2
from PIL import Image
from werkzeug.utils import secure_filename
import os
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
    print(tempname)
    f.save(secure_filename(f.filename))

    inputImage = cv2.imread(name)
    inputImageGray = cv2.cvtColor(inputImage, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(inputImageGray,150,200,apertureSize = 3)

    print(edges)
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
