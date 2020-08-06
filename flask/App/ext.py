import pyodbc
import pyrebase
import json,os
import uuid
from werkzeug.utils import secure_filename

connect_str=('Driver={SQL Server};'
                      'Server=DESKTOP-F5ST7N9;'
                      'Database=DbDoAn1;'
                     'Trusted_Connection=yes;'
                    'Pooling=true;'
                    'pool_size=50'
                    'CPTimeout=3600')

conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=DESKTOP-F5ST7N9;'
                      'Database=DbDoAn1;'
                      'Trusted_Connection=yes;',autocommit=True)




firebaseConfig = {
    'apiKey': "AIzaSyAaUCsX1u6oEn4xMEoqZjpL1WLLBj1pgqU",
    'authDomain': "doan1-f57c6.firebaseapp.com",
    'databaseURL': "https://doan1-f57c6.firebaseio.com",
    'projectId': "doan1-f57c6",
    'storageBucket': "doan1-f57c6.appspot.com",
    'messagingSenderId': "4846891687",
    'appId': "1:4846891687:web:722b9f13c8368130ec2182",
    'measurementId': "G-GR6GY5FNXK",
    "serviceAccount": "./keyfile.json"
  };

firebase = pyrebase.initialize_app(firebaseConfig)
storage=firebase.storage()


def saveImage(uploadFolder,firebaseFolder,file):
    filename=str(uuid.uuid4())
    filename+="."
    filename+=file.filename.split('.')[1]

    #create secure_filename
    filename_secure=secure_filename(filename)
    print("filename_secure",filename_secure)

    #save the file
    file.save(os.path.join(uploadFolder,filename_secure))
    #local file
    local_filename=uploadFolder+"/"+filename_secure
    print("local_filename",local_filename)

    #firebase filename
    firebase_filename=firebaseFolder
    firebase_filename+=filename_secure
    #upload file
    storage.child(firebase_filename).put(local_filename)
    #get the url of the file
    image_url=storage.child(firebase_filename).get_url(None)
    os.remove(os.path.join(uploadFolder, filename_secure))

    #os.remove(os.path.join(uploadFolder, filename_secure))

    return image_url

def deleteImage(filename_delete):
    storage.delete(filename_delete)

