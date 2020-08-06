

class prodType():
    PRODTYPE_ID:str
    PRODTYPE_NAME:str


    def __init__(self,data:dict):
        self.PRODTYPE_ID=data["PRODTYPE_ID"]
        self.PRODTYPE_NAME=data["PRODTYPE_NAME"]