

class Tip():
    TIP_ID:str
    TIP_TITLE:str
    TIP_META_CONTENT:str
    TIP_CONTENT:str
    TIP_AVATAR:str
    TIP_DATE:str
    TIP_STATUS:str

    def __init__(self,data):
        self.TIP_ID = data['TIP_ID']
        self.TIP_TITLE = data['TIP_TITLE']
        self.TIP_META_CONTENT = data['TIP_META_CONTENT']
        self.TIP_CONTENT= data['TIP_CONTENT']
        self.TIP_AVATAR = data['TIP_AVATAR']
        self.TIP_DATE = data['TIP_DATE']
        self.TIP_STATUS = data['TIP_STATUS']

    @classmethod
    def convertToTuple(self,tip):
        data=(tip.TIP_ID,tip.TIP_TITLE,tip.TIP_META_CONTENT,tip.TIP_CONTENT,tip.TIP_AVATAR,tip.TIP_DATE,tip.TIP_STATUS)
        return data