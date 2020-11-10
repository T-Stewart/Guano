import React from "react"
import './App.css'
import Post from "./Components/Post"


function App() {
  return (
    <div className="App">
      <h1 className="guano">Guano</h1>
      <h2 className="header-text">Your Opinion Does Not Matter</h2>
      <h4 className="header-text"> But tell us anyway </h4>
      <Post/>
     
    </div>
  );
}

export default App;
