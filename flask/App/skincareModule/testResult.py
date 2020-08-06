

class TestResult():
    TESTRESULT_ID:str
    TESTRESULT_USER_ID:str
    TESTRESULT_QUESTION:str
    TESTRESULT_ANSWER:str

    def __init__(self,data:dict):
        self.TESTRESULT_ID=data['TESTRESULT_ID']
        self.TESTRESULT_USER_ID=data['TESTRESULT_USER_ID']
        self.TESTRESULT_QUESTION=data['TESTRESULT_QUESTION']
        self.TESTRESULT_ANSWER=data['TESTRESULT_ANSWER']

    @classmethod
    def convertToTuple(self,TestResult):
        data=(TestResult.TESTRESULT_ID,TestResult.TESTRESULT_USER_ID,TestResult.TESTRESULT_QUESTION,TestResult.TESTRESULT_ANSWER)
        return data
