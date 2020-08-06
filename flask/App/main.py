from App.__init__ import app


@app.route('/')
@app.route('/api/home')
def home():
    return 'hello world'





