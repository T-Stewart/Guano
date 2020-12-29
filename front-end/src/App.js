import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css'
import Post from "./Components/Post/Post"
import UserSignup from "./Components/UserSignUp/UserSignup"
import UserLogin from "./Components/UserLogin/UserLogin"
import Home from "./Components/Home/Home"




function App() {
  return (
   <Router>
    <Route path="/" exact component={Home}/>
    <Route path="/posts" exact component={Post}/>
    <Route path="/posts/:id" exact component={Post}/>
    <Route path="/user/new" exact component={UserSignup}/>
    <Route path="/user/login" exact component={UserLogin}/>
   </Router>
  );
}

export default App;
