

class Order():
    ORDER_ID:str
    USER_ID:str
    USER_NAME:str
    ORDER_PAYMENT:str
    ORDER_ADDRESS:str
    USER_PHONENUMBER:int
    ORDER_MAKEDATE:str
    ORDER_DATE:str
    DISCOUNT_ID:str
    ORDER_TOTALTMP:int
    ORDER_TOTAL:int
    ORDER_STATUS:str
    ORDER_NOTE:str
    PRODUCT_ID:str
    PRODUCT_NAME:str
    PRODUCT_PRICE:int
    PRODUCT_IMAGE:str
    PRODUCT_AMOUNT:int
    RECORD_STATUS:str
    ORDER_PROCESSING:int

    def __init__(self,data):
        self.ORDER_ID=data['ORDER_ID']
        self.USER_ID=data['USER_ID']
        self.USER_NAME=data['USER_NAME']
        self.ORDER_PAYMENT=data['ORDER_PAYMENT']
        self.USER_ADDRESS=data['USER_ADDRESS']
        self.USER_PHONENUMBER=data['USER_PHONENUMBER']
        self.ORDER_MAKEDATE=data['ORDER_MAKEDATE']
        self.ORDER_DATE=data['ORDER_DATE']
        self.DISCOUNT_ID=data['DISCOUNT_ID']
        self.ORDER_TOTALTMP=data['ORDER_TOTALTMP']
        self.ORDER_TOTAL=data['ORDER_TOTAL']
        self.ORDER_STATUS=data['ORDER_STATUS']
        self.ORDER_NOTE=data['ORDER_NOTE']
        self.PRODUCT_ID =data['PRODUCT_ID']
        self.PRODUCT_NAME=data['PRODUCT_NAME']
        self.PRODUCT_PRICE=data['PRODUCT_PRICE']
        self.PRODUCT_IMAGE=data['PRODUCT_IMAGE']
        self.PRODUCT_AMOUNT=data['PRODUCT_AMOUNT']
        self.RECORD_STATUS=data['RECORD_STATUS']
        self.ORDER_PROCESSING=data['ORDER_PROCESSING']

    @classmethod
    def convertToTuple(self,order):
       data=(order.ORDER_ID,order.USER_ID,order.USER_NAME,order.ORDER_PAYMENT,order.USER_ADDRESS,order.USER_PHONENUMBER,
             order.ORDER_MAKEDATE,order.ORDER_DATE,order.DISCOUNT_ID,order.ORDER_TOTALTMP,
             order.ORDER_TOTAL,order.ORDER_STATUS,order.ORDER_NOTE,
             order.PRODUCT_ID,order.PRODUCT_NAME,order.PRODUCT_PRICE,order.PRODUCT_IMAGE,
             order.PRODUCT_AMOUNT,order.RECORD_STATUS,order.ORDER_PROCESSING)
       return data
