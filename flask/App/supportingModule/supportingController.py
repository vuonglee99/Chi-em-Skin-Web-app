from flask import Blueprint,request,jsonify
import json
from App.appService import appService
from App.supportingModule.notice import Notice

mod_supporting=Blueprint('supporting',__name__,url_prefix='/api/supporting')
@mod_supporting.route('/getAllNotices',methods=['GET', 'POST'])
def getAllNotices():
    if request.method == 'POST':
        USER_ID = request.form.get('USER_ID')
        param=(USER_ID,)
        result=appService.Getdata('NOTICE_ByUserID',param)

        return jsonify(data=result)
    return 'get all notifications'

@mod_supporting.route('/addNotice',methods=['POST'])
def addNotice():
    if request.method == 'POST':
        data = json.loads(request.get_json().get('body'))
        notice_info = data['notice']
        print(notice_info)
        notice = Notice(notice_info)
        notice_param = Notice.convertToTuple(notice)
        result = appService.commitData("NOTICE_Insert", notice_param)
        return jsonify(data=result)
    return 'insert a notice'

@mod_supporting.route('/deleteNotice',methods=['POST'])
def deleteNotice():
    if request.method == 'POST':
        NOTICE_ID= request.form.get('NOTICE_ID')
        param=(NOTICE_ID,)
        result = appService.commitData('NOTICE_Delete',param)

        return jsonify(data=result)
    return 'delete a notice'