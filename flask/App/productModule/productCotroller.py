from flask import Blueprint,request,jsonify
import json
from App.ext import saveImage
from App.appService import appService
from App.productModule.product import Product
from App.productModule.question import Question
from App.productModule.cart import Cart
from App.productModule.order import Order
from App.productModule.orderStatus import OrderStatus


mod_product=Blueprint('product',__name__,url_prefix='/api/product')
ALLOWED_EXTENSIONS = { 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@mod_product.route('/allProducts',methods=['GET', 'POST'])
def getAllProducts():
    if request.method =="POST":
        data = json.loads(request.get_json().get('body'))
        product_info = data['product']
        product = Product(product_info)
        product_param=Product.convertToTuple(product)
        productList=appService.Getdata("TB_PRODUCT_Search",product_param)
        return jsonify(data=productList)

    return 'Get all products'

@mod_product.route('/addProduct',methods=['GET', 'POST'])
def addProduct():
    if request.method =='POST':
        data = json.loads(request.get_json().get('body'))
        product_info = data['product']
        product = Product(product_info)
        product_param = Product.convertToTuple(product)
        result = appService.commitData("TB_PRODUCT_Insert", product_param)
        return jsonify(data=result)

    return 'add new product'

@mod_product.route('/addProductAvatar',methods=['GET', 'POST'])
def addProductAvatar():
    if request.method =='POST':
        PRODUCT_ID = request.form.get('PRODUCT_ID')
        image = request.files['PRODUCT_IMAGE']
        if image and allowed_file(image.filename):
            PRODUCT_AVATAR_URL = saveImage("./App/images/products", "images/products/", image)
            params = (PRODUCT_ID, PRODUCT_AVATAR_URL)
            result = appService.commitData("TB_PRODUCT_AddAvatar", params)
            return jsonify(data=result)
        return jsonify(data="-1")
    return 'Add product avatar'

@mod_product.route('/deleteProduct/<product_id>', methods=['GET'])
def deleteProduct(product_id):
    if request.method == 'GET':
        params = (product_id,)
        result = appService.commitData("TB_PRODUCT_Delete", params)
        return jsonify(data=result)
    return 'delete product'


@mod_product.route('/productDetail/<product_id>',methods=['GET'])
def productDetail(product_id):
    if request.method == 'GET':
        params=(product_id,)
        result=appService.Getdata("TB_PRODUCT_ById",params)
        return jsonify(data=result)
    return 'get product detail'

@mod_product.route('/updateProduct', methods=['GET', 'POST'])
def updateProduct():
    if request.method == 'POST':
        data = json.loads(request.get_json().get('body'))
        product_info = data['product']
        product= Product(product_info)
        param_product = Product.convertToTuple(product)
        result = appService.commitData("TB_PRODUCT_Update", param_product)

        return jsonify(data=result)

    return 'update product'

#product Type
@mod_product.route('/allproductTypes',methods=['GET','POST'])
def allprodTypes():
    if request.method=='POST':
        PRODTYPE_NAME=request.form.get('PRODTYPE_NAME')
        PRODTYPE_NAME=None
        params=(PRODTYPE_NAME,)
        result=appService.Getdata("TB_PRODTYPE_Search",params)
        return jsonify(data=result)
    return 'get all prodType'

@mod_product.route('/addProductType',methods=['GET', 'POST'])
def addProductType():
    if request.method =='POST':
        PRODTYPE_ID= request.form.get('PRODTYPE_ID')
        PRODTYPE_NAME=request.form.get('PRODTYPE_NAME')
        param=(PRODTYPE_ID,PRODTYPE_NAME)

        result = appService.commitData("TB_PRODTYPE_Insert",param)

        return jsonify(data=result)

    return 'add prodType'

@mod_product.route('/updateProductType',methods=['GET', 'POST'])
def updateProductType():
    if request.method =='POST':
        PRODTYPE_ID= request.form.get('PRODTYPE_ID')
        PRODTYPE_NAME=request.form.get('PRODTYPE_NAME')
        param=(PRODTYPE_ID,PRODTYPE_NAME)

        result = appService.commitData("TB_PRODTYPE_Update",param)

        return jsonify(data=result)

    return 'update prodType'

@mod_product.route('/deleteProductType',methods=['GET', 'POST'])
def deleteProductType():
    if request.method =='POST':
        PRODTYPE_ID= request.form.get('PRODTYPE_ID')
        param=(PRODTYPE_ID,)

        result = appService.commitData("TB_PRODTYPE_Delete",param)

        return jsonify(data=result)

    return 'delete prodType'

#Qusetion
@mod_product.route('/productQuestion',methods=['GET', 'POST'])
def getQuestion():
    if request.method == 'POST':
        PRODUCT_ID=request.form.get('PRODUCT_ID')
        param_question=(PRODUCT_ID,)
        questions=appService.Getdata("TB_QUESTION_ByProductId",param_question)

        return jsonify(data=questions)

    return 'get product questions'

@mod_product.route('/addQuestion',methods=['GET', 'POST'])
def addQuestion():
    if request.method == 'POST':
        data = json.loads(request.get_json().get('body'))
        question_info = data['question']
        question = Question(question_info)
        param_question=Question.convertToTuple(question)
        result=appService.commitData("TB_QUESTION_Insert",param_question)

        return jsonify(data=result)

    return 'add question'

@mod_product.route('/updateQuestion',methods=['GET', 'POST'])
def updateQuestion():
    if request.method =='POST':
        data = json.loads(request.get_json().get('body'))
        question_info = data['question']
        question = Question(question_info)
        param_question = Question.convertToTuple(question)
        result = appService.commitData("TB_QUESTION_Update", param_question)

        return jsonify(data=result)

    return 'update question'

@mod_product.route('/deleteQuestion',methods=['GET', 'POST'])
def deleteQuestion():
    if request.method =='POST':
        QUESTION_ID = request.form.get('QUESTION_ID')
        param=(QUESTION_ID,)
        result = appService.commitData("TB_QUESTION_Delete",param)

        return jsonify(data=result)
    return 'delete Question'
#cart
@mod_product.route('/addToCart',methods=['GET', 'POST'])
def addToCart():
    if request.method =='POST':
        data = json.loads(request.get_json().get('body'))
        cart_info = data['cart']
        cart = Cart(cart_info)
        params_cart=Cart.convertToTuple(cart)
        result=appService.commitData("TB_CART_Insert", params_cart)

        return jsonify(data=result)

    return 'add to cart'

@mod_product.route('/getCart',methods=['GET', 'POST'])
def getCart():
    if request.method =='POST':
        USER_ID = request.form.get('USER_ID')
        param_cart = (USER_ID,)
        result = appService.Getdata("TB_CART_Search", param_cart)

        return jsonify(data=result)

    return 'get cart information'

@mod_product.route('/deleteCart',methods=['GET', 'POST'])
def deleteCart():
    if request.method =='POST':
        data = json.loads(request.get_json().get('body'))
        cart_info = data['cart']
        cart = Cart(cart_info)
        params_cart = Cart.convertToTuple(cart)
        result = appService.commitData("TB_CART_Delete", params_cart)

        return jsonify(data=result)

    return 'delete cart '

@mod_product.route('/deleteCartById',methods=['GET', 'POST'])
def deleteCartById():
    if request.method =='POST':
        data = json.loads(request.get_json().get('body'))

        numOrders = len(data['cartList'])
        i = 0
        result = " "
        while i < numOrders:
            cart_info = data['cartList'][i]
            cart = Cart(cart_info)
            param_cart =(cart.CART_ID,)
            i += 1
            result = appService.commitData("TB_CART_DeleteById", param_cart)

        return jsonify(data=result)

    return 'get cart information'


@mod_product.route('/updateCart',methods=['GET', 'POST'])
def updateCart():
    if request.method =='POST':
        data = json.loads(request.get_json().get('body'))
        cart_info = data['cart']
        cart = Cart(cart_info)
        params_cart = Cart.convertToTuple(cart)
        print(params_cart)
        result = appService.commitData("TB_CART_Update", params_cart)
        return jsonify(data=result)

    return 'update cart '

#Order
@mod_product.route('/getOrder',methods=['GET', 'POST'])
def getOrder():
    if request.method == 'POST':
        data = json.loads(request.get_json().get('body'))
        order_info = data['order']
        order = Order(order_info)
        param_order=Order.convertToTuple(order)
        result = appService.Getdata("ORDER_Search", param_order)

        return jsonify(data=result)

    return 'get order information'


@mod_product.route('/addOrder',methods=['GET', 'POST'])
def addOrder():
    if request.method == 'POST':
        data = json.loads(request.get_json().get('body'))

        numOrders=len(data['orderList'])
        i=0
        result=""
        while i<numOrders:
            order_info = data['orderList'][i]
            order = Order(order_info)
            param_order=Order.convertToTuple(order)
            print("user USER_PHONENUMBER",type(order.USER_PHONENUMBER),order.USER_PHONENUMBER)

            i+=1
            result = appService.commitData("ORDER_Insert", param_order)

        return jsonify(data=result)

    return 'add new order'

@mod_product.route('/cancelOrder',methods=['GET', 'POST'])
def cancelOrder():
    if request.method =='POST':
        ORDER_ID = request.form.get('ORDER_ID')
        param_order = (ORDER_ID,)
        result = appService.commitData("ORDER_Cancel", param_order)

        return jsonify(data=result)

    return 'cancel order'


#order status
@mod_product.route('/getOrderStatus', methods=['GET', 'POST'])
def getOrderStatus():
    if request.method =='POST':
        data = json.loads(request.get_json().get('body'))
        order_status_info = data['orderStatus']
        order_status = OrderStatus(order_status_info)
        param_order_status = OrderStatus.convertToTuple(order_status)
        result = appService.Getdata("ORDER_STATUS_Search", param_order_status)

        return jsonify(data=result)
    return 'get order status'

@mod_product.route('/addOrderStatus',methods=['GET', 'POST'])
def addOrderStatus():
    if request.method =='POST':
        data = json.loads(request.get_json().get('body'))
        order_status_info = data['orderStatus']
        order_status = OrderStatus(order_status_info)
        param_order_status = OrderStatus.convertToTuple(order_status)
        result = appService.commitData("ORDER_STATUS_Insert", param_order_status)

        return jsonify(data=result)
    return 'add order status'

@mod_product.route('/updateOrderStatus',methods=['GET', 'POST'])
def updateOrderStatus():
    if request.method =='POST':
        data = json.loads(request.get_json().get('body'))
        order_status_info = data['orderStatus']
        order_status = OrderStatus(order_status_info)
        param_order_status = OrderStatus.convertToTuple(order_status)
        result = appService.commitData("ORDER_STATUS_Update", param_order_status)

        return jsonify(data=result)
    return 'update order status'
