import React from "react";
import axios from "axios";
import Title from "../Title/Title"
import "./UserLogin.css"

export default class UserLogin extends React.Component{

    constructor(props){
        super(props)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword= this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            email: '', 
            password: ''
        };
    };

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    };

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        let wrongPassword = document.getElementById('wrong-password')    
        const user = {
            email: this.state.email,
            password: this.state.password
        };

        axios ({
            url: '/api/user/login',
            method: 'POST', 
            data: user
        })
        .then(response => {
            console.log('Data has been sent to server now');
            console.log(response)
            if(response.data.success){
                window.location.replace("/posts/" + response.data.userId)
            }else{
                wrongPassword.innerHTML = "Email and/or password is incorrect, please try again"
                wrongPassword.setAttribute("style", "color:red");
            }
        })
        .catch(err =>{
            console.log(err)
        });
    };

    showPassword() {
        let passwordInput = document.getElementById("password-id");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password"
        };
    };

    render() {
        return(
            <div>
                <Title/> 
                <div className="wrapper">                
                    <h3 className="login-title">Log into Your Account</h3>
                    <form className="login-form-group" onSubmit={this.onSubmit}>
                        <div >
                            <label className="label">Email</label>
                            <input 
                                type="email"
                                placeholder= "Email"
                                required
                                id="email-id"
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail} />
                            <label className="label">Password</label> <div id="wrong-password"></div>
                            <input 
                                type="password" 
                                placeholder="Password"
                                required
                                id="password-id"
                                className='form-control'
                                value={this.state.password}
                                onChange={this.onChangePassword} />
                            
                            <div className="label">
                                <input type="checkbox" onChange={this.showPassword}/>
                                <label className="see-pass-wording">Show Password</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="submit" id="login" value="Login" className="login-btn"/>
                        </div>
                    </form>
                </div>
            </div>
           
        )
    }
}