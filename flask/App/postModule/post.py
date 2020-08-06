
class Post():
    POST_ID=str
    POST_PRODUCT_NAME=str
    POST_PRODUCT_TYPE=str
    POST_TITLE=str
    POST_META_CONTENT=str
    POST_CONTENT=str
    POST_AVATAR=str
    POST_IMAGE1=str
    POST_IMAGE2=str
    POST_IMAGE3=str
    POST_DATE=str
    POST_USER_ID=str
    POST_LIKE=int
    POST_STATUS:str


    def __init__(self,data:dict):
        self.POST_ID=data['POST_ID']
        self.POST_PRODUCT_NAME = data['POST_PRODUCT_NAME']
        self.POST_PRODUCT_TYPE = data['POST_PRODUCT_TYPE']
        self.POST_TITLE = data['POST_TITLE']
        self.POST_META_CONTENT = data['POST_META_CONTENT']
        self.POST_CONTENT = data['POST_CONTENT']
        self.POST_AVATAR = data['POST_AVATAR']
        self.POST_IMAGE1 = data['POST_IMAGE1']
        self.POST_IMAGE2 = data['POST_IMAGE2']
        self.POST_IMAGE3 = data['POST_IMAGE3']
        self.POST_DATE = data['POST_DATE']
        self.POST_USER_ID = data['POST_USER_ID']
        self.POST_LIKE = (int)(data['POST_LIKE'])
        self.POST_STATUS=data['POST_STATUS']

    @classmethod
    def setPOST_IMAGE(self,imageName):
        self.POST_IMAGE = imageName

    @classmethod
    def convertToTuple(self,post):
        data=(post.POST_ID,post.POST_PRODUCT_NAME,post.POST_PRODUCT_TYPE, post.POST_TITLE, post.POST_META_CONTENT, post.POST_CONTENT,
                post.POST_AVATAR, post.POST_IMAGE1, post.POST_IMAGE2, post.POST_IMAGE3, post.POST_DATE,
              post.POST_USER_ID, post.POST_LIKE,post.POST_STATUS)
        print(post.POST_LIKE)
        return data

