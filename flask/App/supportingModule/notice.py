
class Notice():
    NOTICE_ID:str
    NOTICE_FROM:str
    USER_ID:str
    NOTICE_TITLE:str
    NOTICE_CONTENT:str
    NOTICE_DATE:str
    NOTICE_STATUS:str
    RECORD_STATUS:str

    def __init__(self,data):
        self.NOTICE_ID=data['NOTICE_ID']
        self.NOTICE_FROM=data['NOTICE_FROM']
        self.USER_ID=data['USER_ID']
        self.NOTICE_TITLE=data['NOTICE_TITLE']
        self.NOTICE_CONTENT=data['NOTICE_CONTENT']
        self.NOTICE_DATE=data['NOTICE_DATE']
        self.NOTICE_STATUS=data['NOTICE_STATUS']
        self.RECORD_STATUS=data['RECORD_STATUS']

    @classmethod
    def convertToTuple(self,notice):
        data=(notice.NOTICE_ID,notice.NOTICE_FROM,notice.USER_ID,notice.NOTICE_TITLE,
              notice.NOTICE_CONTENT,notice.NOTICE_DATE,notice.NOTICE_STATUS,notice.RECORD_STATUS)
        return data