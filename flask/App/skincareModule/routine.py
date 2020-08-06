
class Routine():
    ROUTINE_ID:str
    SKINTYPE_NAME:str
    ROUTINE_NUMBER:int
    ROUTINE_NAME:str
    ROUTINE_PRODUCT:str
    ROUTINE_IMAGE:str
    ROUTINE_NOTE:str
    ROUTINE_RATING:int

    def __init__(self,data:dict):
        self.ROUTINE_ID=data['ROUTINE_ID']
        self.SKINTYPE_NAME=data['SKINTYPE_NAME']
        self.ROUTINE_NUMBER=data['ROUTINE_NUMBER']
        self.ROUTINE_NAME=data['ROUTINE_NAME']
        self.ROUTINE_PRODUCT=data['ROUTINE_PRODUCT']
        self.ROUTINE_IMAGE=data['ROUTINE_IMAGE']
        self.ROUTINE_NOTE=data['ROUTINE_NOTE']
        self.ROUTINE_RATING=data['ROUTINE_RATING']

    @classmethod
    def convertToTuple(self, routine):
        data=(routine.ROUTINE_ID,routine.SKINTYPE_NAME, routine.ROUTINE_NUMBER, routine.ROUTINE_NAME, routine.ROUTINE_PRODUCT,
              routine.ROUTINE_IMAGE, routine.ROUTINE_NOTE,routine.ROUTINE_RATING)
        return data