


class Question():
    QUESTION_ID:str
    PRODUCT_ID:str
    QUESTION_CONTENT:str
    QUESTION_ANSWER:str
    QUESTION_TIME:str
    PRODUCT_RATING:int


    def __init__(self,data):
        self.QUESTION_ID=data['QUESTION_ID']
        self.PRODUCT_ID=data['PRODUCT_ID']
        self.QUESTION_CONTENT=data['QUESTION_CONTENT']
        self.QUESTION_ANSWER=data['QUESTION_ANSWER']
        self.QUESTION_TIME=data['QUESTION_TIME']
        self.PRODUCT_RATING=data['PRODUCT_RATING']

    @classmethod
    def convertToTuple(self,question):
        data=(question.QUESTION_ID,question.PRODUCT_ID,question.QUESTION_CONTENT,question.QUESTION_ANSWER,question.QUESTION_TIME,question.PRODUCT_RATING)
        return data