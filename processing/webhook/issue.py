# from flask import Flask, render_template
import re
# app = Flask(__name__)

def template_match(text_string):
    print(text_string)
    result = re.match("## Description of the problem[\r\n](?s).*[\r\n]## How to solve[\r\n](?s).*[\r\n]## Expected Outcome(?s).*", text_string)
    if(result):
        return True
    else:
        return False
 