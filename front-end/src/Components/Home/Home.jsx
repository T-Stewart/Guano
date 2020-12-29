import React from "react" 
import {Link} from "react-router-dom"
import Title from "../Title/Title"
import "./Home.css"

 export default class Home extends React.Component {

    render() {
        return (
            <div>
                 <Title/>
            <div className="home-page" data-testid="home-page-test">
                <h2 className="home-title">Welcome to Guano</h2>
                <button className="login"><Link to="/user/login">Login</Link></button>
                <button className="login"><Link to="/user/new">Create Account</Link></button>         
            </div>
            </div>

        )
    }
 }