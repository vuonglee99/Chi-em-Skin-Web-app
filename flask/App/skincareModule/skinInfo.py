
class SkinInfo():
    SKININFO_ID:str
    SKININFO_USER_ID:str
    SKININFO_SKINTYPE_ID:str


    def __init__(self,data:dict):
        self.SKININFO_ID=data['SKININFO_ID']
        self.SKININFO_USER_ID=data['SKININFO_USER_ID']
        self.SKININFO_SKINTYPE_ID=data['SKININFO_SKINTYPE_ID']

    @classmethod
    def convertToTuple(self,skinInfo):
        data=(skinInfo.SKININFO_ID,skinInfo.SKININFO_USER_ID,skinInfo.SKININFO_SKINTYPE_ID)
        return data