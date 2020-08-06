import os

class Config(object):
    SECRET_KEY=os.environ.get('SECRET_KEY')or 'can-not-guess'
    ALLOWED_EXTENSIONS = { 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
    UPLOAD_FOLDER = './App/uploads'