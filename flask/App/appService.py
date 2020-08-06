from App.ext import connect_str
import pyodbc

class appService():
    state:int
    cursor:any

    def __init__(self,conn):
        state=1
        self.cursor = conn.cursor()

    @classmethod
    def Getdata(self,procName,params):
        #
        conn = pyodbc.connect(connect_str, autocommit=True, ansi = True)
        numParams=len(params)
        str=""
        while numParams > 0:
            str += "?"
            numParams -= 1
            if numParams > 0:
                str += ","
        sql="EXEC "+ procName +" "+ str
        cursor=conn.cursor()
        cursor.execute(sql,params)
        desc = cursor.description
        column_names = [col[0] for col in desc]
        data = [dict(zip(column_names, row))
                for row in cursor.fetchall()]
        cursor.execute("select  @@SPID")
        x=cursor.fetchall()
        conn.close()
        return data

    @classmethod
    def commitData(self,procName,params):
        conn = pyodbc.connect(connect_str, autocommit=True, ansi = True)
        numParams = len(params)
        str = ""
        while numParams > 0:
            str += "?"
            numParams -= 1
            if numParams > 0:
                str += ","
        sql = " set nocount on; EXEC " + procName + " " + str
        cursor = conn.cursor()
        cursor.execute(sql, params)
        desc = cursor.description
        column_names = [col[0] for col in desc]
        data = [dict(zip(column_names, row))
                for row in cursor.fetchall()]
        conn.close()
        if data != []:
            return data[0]
        else:
            return -1

