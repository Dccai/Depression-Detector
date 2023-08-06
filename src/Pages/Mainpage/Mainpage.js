import React,{useState} from "react";
import './Mainpage.css'
export function Mainpage(){
    let [data,setData]=useState([]);
    let [predict,setPredict]=useState(false);
    function handleAge(e){
        e.preventDefault();
        let form =new FormData(e.currentTarget);
        let dataNew=Object.fromEntries(form);
        setData(a=>[...a,Number(dataNew.age)]);
    }
    async function generateResults(array){
        let bodyObj={gender:array[0],age:array[1],afftype:array[2],melanch:array[3],marriage:array[4],work:array[5]};
        let result=await fetch(`http://localhost:5000/regression`,{'method':'POST',mode: 'cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(bodyObj)}).then(response=>response.json()).catch(error=>console.log(error));
        console.log(result)
        setPredict(Math.ceil(result.prediction));
      
    }
    if(data.length===6 &&predict===false){
        generateResults(data);
       
    }
    if (predict!==false){
        return (<div>
            <h1>Your MADRS Level</h1>
            <p>{predict}</p>
            <h3 id='dict'>MADRS Dictionary</h3>
            <h5>0-6: the patient is in the normal range</h5>
            <h5>7-19: the patient is mildy depressed</h5>
            <h5>20-34: the patient is moderately depressed</h5>
            <h5>35 and up: the patient is severely depressed</h5>
            </div>
        );
    }
   if(data.length===0){
    return (<div>
    <button onClick={()=>{setData([1])}}>Are You Female?</button><button onClick={()=>{setData([2])}}>Are You Male?</button>
    </div>)
   }
   if(data.length===1){
    return (<div>
        <form onSubmit={handleAge}>
            <label style={{display:"block"}}>Your Age</label>
            <input id="age" required name="age" type="number"/>
            <button type="submit">Submit</button>
        </form>
        </div>)

   }
   if(data.length===2){
 
    return (<div>
        <label>Do you experience a pattern of depressive episodes and hypomanic episodes, where you get no sleep?</label>
        <button onClick={()=>{setData(a=>[...a,1])}}>Yes</button>
        <label>Do you experience manic episodes that last for at least 7 days or manic symptoms that are so severe that you needed immediate medical care?</label>
        <button onClick={()=>{setData(a=>[...a,3])}}>Yes</button>
        <label>Do you experience major depressive episodes, yet you don't get manic or hypomanic episodes?</label>
        <button onClick={()=>{setData(a=>[...a,2])}}>Yes</button>
        <label>No, I don't experience any of these things</label>
        <button onClick={()=>{setData(a=>[...a,0])}}>No</button>
        </div>)
   }
   if(data.length===3){
    return(
    <div>
        <label>Are you persisted with an intense feeling of sadness and hopelessness?</label>
        <button onClick={()=>{setData(a=>[...a,1])}}>Yes</button>
        <button onClick={()=>{setData(a=>[...a,2])}}>No</button>
        <button onClick={()=>{setData(a=>[...a,0])}}>I am not sure</button>
    </div>);
   }
   if(data.length===4){
    return (
    <div>
        <label>Are you married?</label>
        <button onClick={()=>{setData(a=>[...a,1])}}>Yes</button>
        <button onClick={()=>{setData(a=>[...a,2])}}>No</button>
        <button onClick={()=>{setData(a=>[...a,0])}}>I am not going to say</button>
    </div>
    )
   }
   if(data.length===5){
    return (
    <div>
        <label>Are you employed or studying?</label>
        <button onClick={()=>{setData(a=>[...a,1])}}>Yes</button>
        <button onClick={()=>{setData(a=>[...a,2])}}>No</button>
        <button onClick={()=>{setData(a=>[...a,0])}}>I am not sure/I don't know</button>
    </div>
    )
   }

}