from flask import render_template
from flask_server import app

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
        }
    ]
    return render_template('index.html', title='Home', user=user, darters=darters);
