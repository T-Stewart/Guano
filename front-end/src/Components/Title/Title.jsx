import React from "react"
import './Title.css'

export default class Title extends React.Component{
    render(){
        return(
      <div className="title-container" data-testid="title-test">
        <h1 className="guano">Guano</h1>
        <h2 className="header-text">Your Opinion Does Not Matter</h2>
        <h4 className="header-text"> But tell us anyway </h4>
      </div>
       );
    };
};