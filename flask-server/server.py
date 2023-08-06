
from flask import Flask,request
import numpy as np
import pandas as pd
from sklearn import model_selection
from sklearn.linear_model import LinearRegression
from flask_cors import CORS
app=Flask(__name__)
CORS(app)
@app.route("/regression",methods=["POST"],strict_slashes=False)
def regression():
    df=pd.read_csv(r'C:\Users\USER\Downloads\scores.csv')
    df.fillna(0,inplace=True)

    gender=request.json['gender']
    age=request.json['age']
    afftype=request.json['afftype']
    melanch=request.json['melanch']
    marriage=request.json['marriage']
    work=request.json['work']
    predictArray=[gender,age,afftype,melanch,marriage,work]
    df=df[['gender','age','afftype','melanch','marriage','work','madrs1','madrs2']]
    changeAge=np.array(df['age'])
    for x in range(len(changeAge)):
        b=changeAge[x]
        z=b.partition('-')
        changeAge[x]=(int(z[0])+int(z[2]))/2
    df['age']=changeAge
    x=np.array(df.drop(['madrs1','madrs2'],axis=1))
    y=np.array(df['madrs2'])
    x_train,x_test,y_train,y_test=model_selection.train_test_split(x,y,test_size=0.25)
    linRegress=LinearRegression()
    linRegress.fit(x_train,y_train)
    accuracy=linRegress.score(x_test,y_test)
    predictor=np.array(predictArray).reshape(1,-1)
    result=linRegress.predict(predictor)
    return {"accuracy":accuracy,"prediction":result[0]}
def members():
    return {"members":["Member1","Member2","Member3"]}
if(__name__=="__main__"):
    app.run(debug=True)
