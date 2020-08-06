from flask import Blueprint,request,jsonify
from App.userModule.user import User
import json
import bcrypt
from App.ext import saveImage
from App.appService import appService

ALLOWED_EXTENSIONS = { 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
mod_user=Blueprint('user',__name__,url_prefix='/api/user')


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@mod_user.route('/')
@mod_user.route('/login',methods=['GET','POST'])
def login():
    if request.method == 'POST':
        params=(request.form.get('USER_NAME'),)
        data = (appService.Getdata("TB_USERS_GetUser", params))
        if(data ==[]):
            return jsonify(data=-1)
        else:
            user=data[0]
            if bcrypt.hashpw(request.form.get('USER_PASSWORD').encode('utf-8'),user['USER_PASSWORD'].encode('utf-8'))==user['USER_PASSWORD'].encode('utf-8'):
                return jsonify(data=user)
            else:
                return jsonify(data=-1)
        return jsonify(data=data)
    return jsonify(data='login failed')

@mod_user.route('/register',methods=['POST'])
def register():
    if request.method == 'POST':
        data=json.loads(request.get_json().get('body'))
        user_info=data['user']
        user=User(user_info)
        pass_ = user.USER_PASSWORD.encode('utf-8')
        hash_password = bcrypt.hashpw(pass_, bcrypt.gensalt()).decode('utf-8')
        user.USER_PASSWORD = hash_password
        params=user.convertToTuple(user)
        result=appService.commitData("TB_USERS_Insert",params)
        return jsonify(data=result)
        return 'failed'

@mod_user.route('/update',methods=['POST'])
def update():
    if request.method == 'POST':
        data = json.loads(request.get_json().get('body'))
        user_info = data['user']
        user = User(user_info)
        params=user.convertToTuple(user)
        result=appService.commitData("TB_USERS_Update",params)
        return jsonify(data=result)
        return 'failed'


@mod_user.route('/add-avatar', methods=['GET', 'POST'])
def add_Avatar():
    if request.method == 'POST':
        USER_ID = request.form.get('USER_ID')
        image = request.files['USER_AVATAR']
        if image and allowed_file(image.filename):
            USER_AVATAR_URL = saveImage("./App/images/user", "images/user/", image)
            params=(USER_ID, USER_AVATAR_URL)
            result=appService.commitData("TB_USERS_AddAvatar",params)
            result['USER_AVATAR'] = USER_AVATAR_URL
            return jsonify(data=result)
        return jsonify(data="-1")
    return 'Add post avatar'


@mod_user.route('/singleUser/<user_id>',methods=['GET'])
def singleUser(user_id):
    if request.method == 'GET':
        params=(user_id,)
        result=appService.commitData("TB_USERS_ById",params)
        return jsonify(data=result)
    return 'Get user by user_name'

@mod_user.route('/getAllUser',methods=['GET','POST'])
def getAllUser():
    if request.method == 'POST':
        data = json.loads(request.get_json().get('body'))
        user_info = data['user']
        user = User(user_info)
        params = user.convertToTuple(user)
        result = appService.Getdata("TB_USERS_Search", params)
        return jsonify(data=result)
    return 'get All user'
