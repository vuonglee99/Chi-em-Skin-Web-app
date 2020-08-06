from flask import Blueprint,request,jsonify
import json
from App.ext import saveImage
from App.appService import appService
from App.skincareModule.skinType import SkinType
from App.skincareModule.skinTest import SkinTest
from App.skincareModule.testResult import TestResult
from  App.skincareModule.skinInfo import SkinInfo
from App.skincareModule.routine import Routine
from App.skincareModule.userRoutine import UserRoutine

mod_skincare=Blueprint('skincare',__name__,url_prefix='/api/skincare')
ALLOWED_EXTENSIONS = { 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#skin test
@mod_skincare.route('/skintests',methods=['GET', 'POST'])
def getSkinTest():
    if request.method == 'POST':
        data = json.loads(request.get_json().get('body'))
        skintest_info = data['skintest']
        skintest=SkinTest(skintest_info)
        params=SkinTest.convertToTuple(skintest)
        result=appService.Getdata("TB_SKINTEST_Search",params)
        return jsonify(data=result)
    return 'get skin test'

@mod_skincare.route('/addSkinTest',methods=['POST'])
def addSkinTest():
    if request.method == 'POST':
        data = json.loads(request.get_json().get('body'))
        skintest_info = data['skintest']
        skintest = SkinTest(skintest_info)
        params = SkinTest.convertToTuple(skintest)
        result = appService.commitData("TB_SKINTEST_Insert", params)
        return jsonify(data=result)
    return 'add skin test'


@mod_skincare.route('/updateSkinTest',methods=['POST'])
def updateSkinTest():
    if request.method == 'POST':
        data = json.loads(request.get_json().get('body'))
        skintest_info = data['skintest']
        skintest = SkinTest(skintest_info)
        params = SkinTest.convertToTuple(skintest)
        result = appService.commitData("TB_SKINTEST_Update", params)
        return jsonify(data=result)
    return 'update skin test'

@mod_skincare.route('/deleteSkinTest', methods=['POST'])
def deleteSkinTest():
    if request.method == 'POST':
        SKINTEST_ID = request.form.get('SKINTEST_ID')
        param = (SKINTEST_ID,)
        result = appService.commitData("TB_SKINTEST_Delete", param)

        return jsonify(data=result)
    return 'delete SkinTest'


@mod_skincare.route('/testResult',methods=['POST'])
def testResult():
    if request.method == 'POST':
        #get testResult from request as json file
        data = json.loads(request.get_json().get('body'))
        testResult_info = data['testResult']
        testResult = TestResult(testResult_info)
        params_testResult = TestResult.convertToTuple(testResult)

        #get skin type data from db base on testResult
        params_skinType=('',testResult.TESTRESULT_ANSWER,'','','','','','','')
        skinType_data = appService.Getdata("TB_SKINTYPE_Search", params_skinType)
        skinType=SkinType(skinType_data[0])

        params_skinInfo=('',testResult.TESTRESULT_USER_ID,'')
        skinInfo_data = appService.Getdata("TB_SKININFO_ByUserId", params_skinInfo)
        print(skinInfo_data)
        result=any

        if len(skinInfo_data)==0:#chua co bang skininfo va skincare routine
            routine_info=getSkinRoutineInfo(skinType.SKINTYPE_NAME)
            for routine in routine_info:
                user_routine=UserRoutine.convertToUserRoutine(UserRoutine,routine,testResult.TESTRESULT_USER_ID)
                result=appService.commitData("USER_ROUTINE_Insert",user_routine)

            params=('',testResult.TESTRESULT_USER_ID,skinType.SKINTYPE_ID)
            result=appService.commitData("TB_SKININFO_Insert",params)

        else:
            params_delete=(testResult.TESTRESULT_USER_ID,)
            delete_result=appService.commitData("USER_ROUTINE_DeleteByUserId",params_delete)
            routine_info = getSkinRoutineInfo(skinType.SKINTYPE_NAME)
            for routine in routine_info:
                user_routine = UserRoutine.convertToUserRoutine(UserRoutine, routine, testResult.TESTRESULT_USER_ID)
                result = appService.commitData("USER_ROUTINE_Insert", user_routine)
            skinInfo=SkinInfo(skinInfo_data[0])
            params=(skinInfo.SKININFO_ID,skinInfo.SKININFO_USER_ID,skinType.SKINTYPE_ID)
            result=appService.commitData("TB_SKININFO_Update",params)

        return jsonify(data=result)
    return 'skin result'

def getSkinRoutineInfo(skinTypeName):
    params=(skinTypeName,)
    result=appService.Getdata("TB_ROUTINE_BySkinTypeName",params)
    return result


@mod_skincare.route('/skinInfo',methods=['POST'])
def skinInfo():
    if request.method == 'POST':
        USER_ID=request.form.get('USER_ID')
        params_skinInfo=('',USER_ID,'',)
        skinInfo_data=appService.Getdata("TB_SKININFO_ByUserId",params_skinInfo)
        skinInfo=any
        if len(skinInfo_data)!=0:
            skinInfo=SkinInfo(skinInfo_data[0])
        else:
            result={"RESULT":"-1"}
            return jsonify(data=result)
        params_skinType=(skinInfo.SKININFO_SKINTYPE_ID,'','','','','')
        skinType_data=appService.Getdata("TB_SKINTYPE_ById",params_skinType)

        return jsonify(data=skinType_data)
    return 'get skin information'

#USER ROUTINE
@mod_skincare.route('/routineInfo',methods=['GET','POST'])
def skinRoutine():
    if request.method == 'POST':
        USER_ID=request.form.get('USER_ID')
        params=(USER_ID,)
        result=appService.Getdata("USER_ROUTINE_ByUserId",params)
        return jsonify(data=result)
    return 'Get routine information'

@mod_skincare.route('/routineUpdate',methods=['POST'])
def routineUpdate():
    if request.method == 'POST':
        data = json.loads(request.get_json().get('body'))
        routine_info = data['routine']
        routine= UserRoutine(routine_info)
        params_routine=UserRoutine.convertToTuple(routine)
        result=appService.commitData("USER_ROUTINE_Update",params_routine)
        return jsonify(data=result)
    return 'Update user skincare routine'

@mod_skincare.route('/routineUpdateImage',methods=['POST'])
def routineUpdateImage():
    if request.method == 'POST':
        image = request.files['newImage']
        USER_ROUTINE_ID=request.form.get('USER_ROUTINE_ID')

        if image and allowed_file(image.filename):
            ROUTINE_IMAGE_URL = saveImage("./App/images/skincareRoutine", "images/skincareRoutine/", image)
            params=(USER_ROUTINE_ID,ROUTINE_IMAGE_URL)
            result=appService.commitData("USER_ROUTINE_UpdateImage",params)

            return jsonify(data=result)

    return 'update routine image'

@mod_skincare.route('/deleteRoutine',methods=['POST'])
def deleteRoutine():
    if request.method == 'POST':
        USER_ROUTINE_ID=request.form.get('USER_ROUTINE_ID')
        params_delete=(USER_ROUTINE_ID,)
        result=appService.commitData("USER_ROUTINE_Delete",params_delete)

        return jsonify(data=result)
    return 'Delete routine'

#ADMIN ROUTINE
@mod_skincare.route('/getAllAdminRoutines',methods=['POST'])
def getAllRoutines():
    if request.method == 'POST':
        data = json.loads(request.get_json().get('body'))
        routine_info = data['routine']
        routine = Routine(routine_info)
        params_routine = Routine.convertToTuple(routine)
        result = appService.Getdata("TB_ROUTINE_Search", params_routine)
        return jsonify(data=result)
    return 'get all skincare routine'

@mod_skincare.route('/updateAdminRoutine',methods=['POST'])
def updateRoutine():
    if request.method == 'POST':
        data = json.loads(request.get_json().get('body'))
        routine_info = data['routine']
        routine = Routine(routine_info)
        params_routine = Routine.convertToTuple(routine)
        result = appService.commitData("TB_ROUTINE_Update", params_routine)
        return jsonify(data=result)
    return 'update skincare routine'

@mod_skincare.route('/updateAdminRoutineImage',methods=['POST'])
def updateAdminRoutineImage():
    if request.method == 'POST':
        image = request.files['newImage']
        ROUTINE_ID=request.form.get('ROUTINE_ID')

        if image and allowed_file(image.filename):
            ROUTINE_IMAGE_URL = saveImage("./App/images/skincareRoutine", "images/skincareRoutine/", image)
            params=(ROUTINE_ID,ROUTINE_IMAGE_URL)
            result=appService.commitData("TB_ROUTINE_UpdateImage",params)

            return jsonify(data=result)

    return 'update routine image'

# skinType
@mod_skincare.route('/getAllSkinTypes',methods=['POST'])
def getAllSkinTypes():
    if request.method == 'POST':
        data = json.loads(request.get_json().get('body'))
        skinType_info = data['skinType']
        skinType = SkinType(skinType_info)
        params = SkinType.convertToTuple(skinType)
        result = appService.Getdata ("TB_SKINTYPE_Search", params)
        return jsonify(data=result)
    return 'get all skin types'

@mod_skincare.route('/updateSkinType', methods=['POST'])
def updateSkinType():
    if request.method == 'POST':
        data = json.loads(request.get_json().get('body'))
        skinType_info = data['skinType']
        skinType = SkinType(skinType_info)
        params = SkinType.convertToTuple(skinType)
        result = appService.commitData("TB_SKINTYPE_Update", params)
        return jsonify(data=result)
    return 'get all skin types'
