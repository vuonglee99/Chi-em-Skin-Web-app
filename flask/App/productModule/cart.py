
class Cart():
    CART_ID:str
    USER_ID:str
    PRODUCT_ID:str
    PRODUCT_NAME:str
    PRODUCT_TYPE:str
    PRODUCT_PRICE:int
    PRODUCT_INFO:str
    PRODUCT_RATING:int
    PRODUCT_TOTAL:int
    PRODUCT_IMAGE:str
    SKINTYPE_NAME:str
    PRODUCT_ORIGIN:str
    PRODUCT_BRAND:str
    PRODUCT_CAPACITY:str
    PRODUCT_AMOUNT:int


    def __init__(self,data):
        self.CART_ID = data['CART_ID']
        self.USER_ID = data['USER_ID']
        self.PRODUCT_ID=data['PRODUCT_ID']
        self.PRODUCT_TOTAL=data['PRODUCT_TOTAL']
        self.PRODUCT_NAME = data['PRODUCT_NAME']
        self.PRODUCT_TYPE = data['PRODUCT_TYPE']
        self.PRODUCT_PRICE = data['PRODUCT_PRICE']
        self.PRODUCT_INFO = data['PRODUCT_INFO']
        self.PRODUCT_RATING = data['PRODUCT_RATING']
        self.PRODUCT_TOTAL = data['PRODUCT_TOTAL']
        self.PRODUCT_IMAGE = data['PRODUCT_IMAGE']
        self.SKINTYPE_NAME = data['SKINTYPE_NAME']
        self.PRODUCT_ORIGIN = data['PRODUCT_ORIGIN']
        self.PRODUCT_BRAND = data['PRODUCT_BRAND']
        self.PRODUCT_CAPACITY = data['PRODUCT_CAPACITY']
        self.PRODUCT_AMOUNT=data['PRODUCT_AMOUNT']

    @classmethod
    def convertToTuple(self,cart):
        data=(cart.CART_ID,cart.USER_ID,cart.PRODUCT_ID,cart.PRODUCT_NAME,cart.PRODUCT_TYPE,cart.PRODUCT_PRICE,
              cart.PRODUCT_INFO,cart.PRODUCT_RATING,cart.PRODUCT_TOTAL,cart.PRODUCT_IMAGE,cart.SKINTYPE_NAME,
              cart.PRODUCT_ORIGIN,cart.PRODUCT_BRAND,cart.PRODUCT_CAPACITY,cart.PRODUCT_AMOUNT)
        return data
