import numpy as np
import pandas as pd
from sklearn import model_selection
from sklearn.linear_model import LinearRegression
df=pd.read_csv(r'C:\Users\USER\Downloads\scores.csv')
df.fillna(0,inplace=True)
df=df[['gender','age','afftype','melanch','inpatient','marriage','work','madrs1','madrs2']]
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
print(accuracy)
print(linRegress.predict(x_test))