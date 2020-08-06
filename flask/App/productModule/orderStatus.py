

class OrderStatus():
    STATUS_ID:str
    STATUS_CONTENT:str
    RECORD_STATUS:str
    ORDER_PROCESSING:int

    def __init__(self,data):
        self.STATUS_ID=data['STATUS_ID']
        self.STATUS_CONTENT=data['STATUS_CONTENT']
        self.RECORD_STATUS=data['RECORD_STATUS']
        self.ORDER_PROCESSING=data['ORDER_PROCESSING']

    @classmethod
    def convertToTuple(self,orderStatus):
        data=(orderStatus.STATUS_ID,orderStatus.STATUS_CONTENT,orderStatus.RECORD_STATUS,orderStatus.ORDER_PROCESSING)
        return data