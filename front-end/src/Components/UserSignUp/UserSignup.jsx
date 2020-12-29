import React from "react";
import axios from "axios";
import Title from "../Title/Title"
import "./UserSignUp.css"

export default class UserSignup extends React.Component {

    constructor(props){
        super(props)
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkPasswordSame = this.checkPasswordSame.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            email: '', 
            password: '',
            confirmPassword: ''
        };
    };

    onChangeFirstName = (e) => {
        this.setState({
            firstName: e.target.value
        });
    };

     onChangeLastName = (e) => {
        this.setState({
            lastName: e.target.value
        });
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

     onChangeConfirmPassword = (e) => {
        this.setState({
            confirmPassword: e.target.value
        });
    };

    checkPasswordSame = (e) => {
        e.preventDefault();
        let password = this.state.password;
        let confirmPassword = this.state.confirmPassword;
        let passwordError = document.getElementById('password-error')
        passwordError.innerText = " ";

        if(password.length >= 6){
            if(password === confirmPassword){
                this.onSubmit()
            }else{
                passwordError.innerText = "The Password fields do not match. Please try again."
                passwordError.setAttribute("style", "color:red")
            }
            }else {
                passwordError.innerText = "Paswords must be a minimum of 6 characters. Try again."
                passwordError.setAttribute("style", "color:red")
        };
    };

    onSubmit(){
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        };

        let createdUser = document.getElementById('createdUserMessage')
        let emailError = document.getElementById('email-error')
        emailError.innerHTML = "";
        createdUser.innerHTML = "";

        axios({
            url: '/api/user/new', 
            method: 'POST',
            data: user
        })
        .then(response => {
            console.log('Data has been sent to server')
            let createdUser = document.getElementById('createdUserMessage')
            createdUser.innerHTML = "Thanks for signing up to Guano! Please click <a href= '/user/login'>here</a> to login"

            if(response.date) {
                console.log('... redirecting')
                emailError.innerHTML = "Sorry this username already exists, please click <a href='/user/login'>here</a> to login";
                emailError.setAttribute("style", "color:red")
                createdUser.innerHTML = "";
            }
        })
        .catch(err => {
            console.log(err)
        });
    };

    showPassword() {
         let passwordInput = document.getElementById("password-id");
            if (passwordInput.type === "password") {
            passwordInput.type = "text";
            } else {
            passwordInput.type = "password";
            }
        let passwordInput2 = document.getElementById("password-id2");
            if (passwordInput2.type === "password") {
            passwordInput2.type = "text";
            } else {
            passwordInput2.type = "password";
            }
        };
    
    render() {
        return(
            <div>
                <Title/>
                <div className="create-wrapper">
                    <center>
                        <h3 className="login-title">Sign up to Guano!</h3>
                    </center>
                    <form onSubmit={this.checkPasswordSame}>
                        <div className="form-group">
                            <label className="label">First Name</label>
                            <input 
                                type="text"
                                id="firstName"
                                placeholder="First Name"
                                required
                                className="form-control"
                                value={this.state.firstName}
                                onChange={this.onChangeFirstName} />

                            <label className="label">Last Name</label>
                            <input 
                                type="text"
                                id="lastName"
                                placeholder="Last Name"
                                required
                                className="form-control"
                                value={this.state.lastName}
                                onChange={this.onChangeLastName} />

                            <label className="label">Email</label> <div id="email-error"></div>
                            <input 
                                type="email"
                                placeholder="Email"
                                id="email"
                                required
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail} />

                            <label className="label">Password</label> <div id="password-error"></div>
                            <input 
                                type="password"
                                placeholder="Password"
                                id="password-id2"
                                required
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChangePassword} />

                              <label className="label">Confirm Password</label> <div id="password-error"></div>
                            <input 
                                type="password"
                                placeholder="Confirm Password"
                                id="password-id2"
                                required
                                className="form-control"
                                value={this.state.confirmPassword}
                                onChange={this.onChangeConfirmPassword} />
                            <input type="checkbox" onChange={this.showPassword}/>
                            <label className="label"> See Password</label>
                        </div>
                        <div className="form-group">
                            <input type="submit" id="createUser" value="Create User" className="creat-user-btn"/>
                        </div>
                        <div id="createdUserMessage"></div>
                    </form>
                </div>
            </div>
        );
    };
};