from flask import render_template, request, jsonify
from flask_server import app
import json
from os.path import dirname, realpath, sep
import sys
sys.path.append(dirname(realpath(__file__)))
import model

@app.route('/')
@app.route('/index')
def index():
    user = {'nickname': 'Tom'}
    darters = [
        {
            'name': 'Sahil',
            'mapid': "mapid2"
        },
        {
            'name': 'David',
            'mapid': "mapid3"
        },
        {
            'name': 'Tom',
            'mapid': "mapid4"
        },
        {
            'name': 'Angelo',
            'mapid': "mapid5"
        },
        {
            'name': 'The Fifth',
            'mapid': "mapid6"
        }
    ]
    post = {
        'id': 7,
        'body':'Greg'
    }
    return render_template('index.html', title='Home', user=user, darters=darters, post=post);

@app.route('/results', methods=['POST'])
def getResults():
    user = request.form['user'];
    gpx = request.form['gpx'];

    # f = open("gpx_data/20150909_185946.gpx",'r')
    # gpx = f.read()

    j = json.dumps([{
        'user': user,
        'gpx': gpx
    }]);
    # print(j);

    # Run the model and get some results
    return model.handle_request(j)
