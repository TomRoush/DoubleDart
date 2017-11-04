
# coding: utf-8

# In[ ]:

from flask import Flask, request
app = Flask(__name__)

@app.route('/')
def display():
    return "Looks like it works!"

@app.route('/result', methods=['POST'])
def result():
    print(request.args.get('key')) # should display 'value'
    return 'Received !' # response to your request

if __name__=='__main__':
    app.run()


# In[ ]:



