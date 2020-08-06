from flask import Blueprint,request,jsonify
from App.postModule.post import Post
import json
from App.ext import saveImage
from App.appService import appService
from App.postModule.tip import Tip

ALLOWED_EXTENSIONS = { 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

mod_post=Blueprint('post',__name__,url_prefix='/api/post')

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@mod_post.route('/allposts',methods=['GET','POST'])
def allposts():
    if request.method=='POST':
        data = json.loads(request.get_json().get('body'))
        post_info = data['post']
        post = Post(post_info)
        params=post.convertToTuple(post)
        result=appService.Getdata("TB_POST_Search",params)
        return jsonify(data=result)
    return 'get all posts'

@mod_post.route('/makeID',methods=['GET'])
def makeID():
    if request.method == 'GET':
        table_name="TB_POST"
        params=(table_name,)
        POST_ID=appService.commitData("TB_POST_MakeId",params)
        return jsonify(data=POST_ID)
    return 'make post id'


@mod_post.route('/add',methods=['GET','POST'])
def addPost():
    if request.method == 'POST':
        data=json.loads(request.get_json().get('body'))
        post_info = data['post']
        post = Post(post_info)
        params=post.convertToTuple(post)
        result=appService.commitData("TB_POST_Insert",params)
        return jsonify(data=result)
    return 'Insert a new post'

@mod_post.route('/add-avatar',methods=['GET','POST'])
def add_Avatar():
    if request.method == 'POST':
        POST_ID=request.form.get('POST_ID')
        image = request.files['POST_AVATAR']
        if image and allowed_file(image.filename):
            POST_AVATAR_URL = saveImage("./App/images/post", "images/post/", image)
            params=(POST_ID,POST_AVATAR_URL)
            result=appService.commitData("TB_POST_AddAvatar",params)
            return jsonify(data=result)
        return jsonify(data="-1")
    return 'Add post avatar'


@mod_post.route('/singlePost/<post_id>',methods=['GET'])
def singlePost(post_id):
    if request.method == 'GET':
        params=(post_id,)
        result=appService.Getdata("TB_POST_ById",params)
        return jsonify(data=result)
    return 'get singlePost'

@mod_post.route('/checkPost',methods=['GET','POST'])
def checkPost():
    if request.method == 'POST':
        POST_ID = request.form.get('POST_ID')
        params=(POST_ID,)
        result=appService.commitData("TB_POST_Check",params)
        return jsonify(data=POST_ID)
    return 'check post'

@mod_post.route('/deletePost',methods=['POST'])
def deletePost():
    if request.method == 'POST':
        POST_ID = request.form.get('POST_ID')
        params = (POST_ID,)
        result = appService.commitData("TB_POST_Delete", params)
        return jsonify(data=result)
    return 'delete post'

#Tips post
@mod_post.route('/allTips',methods=['GET','POST'])
def allTips():
    if request.method=='POST':
        data = json.loads(request.get_json().get('body'))
        tip_info = data['tip']
        tip = Tip(tip_info)
        params=Tip.convertToTuple(tip)
        result=appService.Getdata("TB_TIP_Search",params)
        return jsonify(data=result)
    return 'get all tips'


@mod_post.route('/addTip',methods=['GET','POST'])
def addTip():
    if request.method == 'POST':
        data=json.loads(request.get_json().get('body'))
        tip_info = data['tip']
        tip = Tip(tip_info)
        params=Tip.convertToTuple(tip)
        result=appService.commitData("TB_TIP_Insert",params)
        return jsonify(data=result)
    return 'add a new tip'

@mod_post.route('/addTipAvatar',methods=['GET','POST'])
def addTipAvatar():
    if request.method == 'POST':
        TIP_ID=request.form.get('TIP_ID')
        image = request.files['TIP_AVATAR']
        if image and allowed_file(image.filename):
            TIP_AVATAR_URL = saveImage("./App/images/post", "images/post/", image)
            params=(TIP_ID,TIP_AVATAR_URL)
            result=appService.commitData("TB_TIP_AddAvatar",params)
            return jsonify(data=result)
        return jsonify(data="-1")
    return 'Add tip avatar'

@mod_post.route('/updateTip',methods=['GET','POST'])
def updateTip():
    if request.method == 'POST':
        data=json.loads(request.get_json().get('body'))
        tip_info = data['tip']
        tip = Tip(tip_info)
        params=Tip.convertToTuple(tip)
        result=appService.commitData("TB_TIP_Update",params)
        return jsonify(data=result)
    return 'Insert a new '

@mod_post.route('/deleteTip',methods=['POST'])
def deleteTip():
    if request.method == 'POST':
        TIP_ID = request.form.get('TIP_ID')
        params = (TIP_ID,)
        result = appService.commitData("TB_TIP_Delete", params)
        return jsonify(data=result)
    return 'delete post'








