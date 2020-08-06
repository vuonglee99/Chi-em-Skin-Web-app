

class Product():
    PRODUCT_ID=str
    PRODUCT_NAME=str
    PRODUCT_TYPE=str
    PRODUCT_PRICE=int
    PRODUCT_INFO=str
    PRODUCT_RATING=int
    PRODUCT_TOTAL=int
    PRODUCT_IMAGE=str
    SKINTYPE_NAME=str
    PRODUCT_ORIGIN=str
    PRODUCT_BRAND=str
    PRODUCT_CAPACITY=str


    def __init__(self,data):
        self.PRODUCT_ID=data['PRODUCT_ID']
        self.PRODUCT_NAME=data['PRODUCT_NAME']
        self.PRODUCT_TYPE=data['PRODUCT_TYPE']
        self.PRODUCT_PRICE= data['PRODUCT_PRICE']
        self.PRODUCT_INFO=data['PRODUCT_INFO']
        self.PRODUCT_RATING=data['PRODUCT_RATING']
        self.PRODUCT_TOTAL=data['PRODUCT_TOTAL']
        self.PRODUCT_IMAGE=data['PRODUCT_IMAGE']
        self.SKINTYPE_NAME=data['SKINTYPE_NAME']
        self.PRODUCT_ORIGIN=data['PRODUCT_ORIGIN']
        self.PRODUCT_BRAND=data['PRODUCT_BRAND']
        self.PRODUCT_CAPACITY=data['PRODUCT_CAPACITY']


    @classmethod
    def convertToTuple(self,product):
        data=(product.PRODUCT_ID,product.PRODUCT_NAME,product.PRODUCT_TYPE,product.PRODUCT_PRICE,
              product.PRODUCT_INFO,product.PRODUCT_RATING,product.PRODUCT_TOTAL,product.PRODUCT_IMAGE,product.SKINTYPE_NAME,
              product.PRODUCT_ORIGIN,product.PRODUCT_BRAND,product.PRODUCT_CAPACITY)
        return data

    def __getitem__(self, key):
        return getattr(self, key)

