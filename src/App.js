
import './App.css';
import React,{createContext,useState,useEffect} from 'react';
import { Mainpage } from './Pages/Mainpage/Mainpage';
export const Context=createContext();
function App() {

  return (
    <div className="App">
      <h1>The Online Depression Level Detector</h1>
      <h3>Keep in mind the Detector may not always be accurate</h3>
      <Mainpage/>
    </div>
  );
}

export default App;
