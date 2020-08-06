

class SkinTest():
    SKINTEST_ID:str
    SKINTEST_QUESTION:str
    SKINTEST_ANSWER_A:str
    SKINTEST_ANSWER_B:str
    SKINTEST_ANSWER_C:str
    SKINTEST_ANSWER_D:str

    def __init__(self,data:dict):
        self.SKINTEST_ID=data['SKINTEST_ID']
        self.SKINTEST_QUESTION=data['SKINTEST_QUESTION']
        self.SKINTEST_ANSWER_A=data['SKINTEST_ANSWER_A']
        self.SKINTEST_ANSWER_B=data['SKINTEST_ANSWER_B']
        self.SKINTEST_ANSWER_C=data['SKINTEST_ANSWER_C']
        self.SKINTEST_ANSWER_D=data['SKINTEST_ANSWER_D']

    @classmethod
    def convertToTuple(self,skinTest):
        data=(skinTest.SKINTEST_ID,skinTest.SKINTEST_QUESTION,skinTest.SKINTEST_ANSWER_A,
              skinTest.SKINTEST_ANSWER_B,skinTest.SKINTEST_ANSWER_C,skinTest.SKINTEST_ANSWER_D)
        return data
