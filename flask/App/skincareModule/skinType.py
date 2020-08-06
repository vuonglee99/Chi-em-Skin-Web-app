

class SkinType():
    SKINTYPE_ID:str
    SKINTYPE_NAME:str
    SKINTYPE_INFO:str
    SKINTYPE_ROUTINE_1:str
    SKINTYPE_ROUTINE_2:str
    SKINTYPE_TIP:str
    SKINTYPE_IMAGE_1:str
    SKINTYPE_IMAGE_2: str
    SKINTYPE_IMAGE_3:str

    def __init__(self,data:dict):
        self.SKINTYPE_ID=data['SKINTYPE_ID']
        self.SKINTYPE_NAME=data['SKINTYPE_NAME']
        self.SKINTYPE_INFO=data['SKINTYPE_INFO']
        self.SKINTYPE_ROUTINE_1=data['SKINTYPE_ROUTINE_1']
        self.SKINTYPE_ROUTINE_2=data['SKINTYPE_ROUTINE_2']
        self.SKINTYPE_TIP=data['SKINTYPE_TIP']
        self.SKINTYPE_IMAGE_1=data['SKINTYPE_IMAGE_1']
        self.SKINTYPE_IMAGE_2=data['SKINTYPE_IMAGE_2']
        self.SKINTYPE_IMAGE_3=data['SKINTYPE_IMAGE_3']

    @classmethod
    def convertToTuple(self,skinType):
        data=(skinType.SKINTYPE_ID,skinType.SKINTYPE_NAME,skinType.SKINTYPE_INFO,
              skinType.SKINTYPE_ROUTINE_1,skinType.SKINTYPE_ROUTINE_2,skinType.SKINTYPE_TIP,
              skinType.SKINTYPE_IMAGE_1,skinType.SKINTYPE_IMAGE_2,skinType.SKINTYPE_IMAGE_3)
        return data