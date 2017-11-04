from flask import render_template
from flask_server import app

@app.route('/')
@app.route('/index')
def index():
    user = {'nickname': 'Tom'}
    posts = [
        {
            'author': {'nickname': 'Sahil'},
            'body': 'Beautiful day at UIUC!'
        },
        {
            'author': {'nickname': 'David'},
            'body': 'The Avengers movie was so cool'
        }
    ]
    return render_template('index.html', title='Home', user = user, posts=posts);
