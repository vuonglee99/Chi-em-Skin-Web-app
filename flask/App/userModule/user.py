import bcrypt

class User():
    USER_ID =str;
    USER_NAME =str;
    USER_PASSWORD =str;
    USER_GENDER =str;
    USER_BIRTHDAY =str;
    USER_EMAIL =str;
    USER_ADDRESS =str;
    USER_PHONENUMBER =str;
    USER_AVATAR=str;
    USER_ROLE=str;

    def __init__(self,data: dict):
        self.USER_ID =data['USER_ID']
        self.USER_NAME=data['USER_NAME']
        self.USER_PASSWORD=data['USER_PASSWORD']
        self.USER_GENDER=data['USER_GENDER']
        self.USER_BIRTHDAY=data['USER_BIRTHDAY']
        self.USER_EMAIL =data['USER_EMAIL']
        self.USER_ADDRESS=data['USER_ADDRESS']
        self.USER_PHONENUMBER=data['USER_PHONENUMBER']
        self.USER_AVATAR=data['USER_AVATAR']
        self.USER_ROLE=data['USER_ROLE']


    @classmethod
    def convertToTuple(self,user):
        data = (user.USER_ID, user.USER_NAME, user.USER_PASSWORD, user.USER_GENDER, user.USER_BIRTHDAY, user.USER_EMAIL,
        user.USER_ADDRESS, user.USER_PHONENUMBER, user.USER_AVATAR,user.USER_ROLE)
        return data









