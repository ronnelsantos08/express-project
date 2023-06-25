import React, { useEffect, useState } from 'react'
import './App.css'
import Axios from "axios";


function App() {
const [username, setUsername] = useState("");
const [userEmail, setUserEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const [loginUsername, setLoginUsername] = useState("");
const [loginPassword, setLoginPassword] = useState("");

const [loginStatus, setLoginStatus] = useState("");
const [registerStatus, setRegisterStatus] = useState("");

 /* Cookie Validation */
Axios.defaults.withCredentials = true;

 /* For LogIn Sending data to Backend */
const login = () => {
  Axios.post("http://localhost:5000/login", {
    username: loginUsername,
    password: loginPassword,
  }).then((response)=> { 

    if(response.data.message) {
      setLoginStatus(response.data.message)
    } else {
      setLoginStatus(response.data[0].username)
    }

  })
}


 /* For Registration Sending data to Backend */
const register = () => {
  Axios.post("http://localhost:5000/register", {
  username: username,
  userEmail: userEmail,
  password: password,
  confirmPassword: confirmPassword,
  }).then((response)=> { 
    if(response.data.message) {
      setRegisterStatus(response.data.message)
    } else {
      setRegisterStatus(response.data[0].username)
    }
  })
};

 /* For Session Validation from Backend */
useEffect(() => {
  Axios.get("http://localhost:5000/login").then ((response) => {
    if(response.data.loggedIn === true){
    setLoginStatus(response.data.user[0].username)
    }
  })
}, [])

  return (
    <div>
      <div className="container-fluid">
		<div className="container">
			<h2 className="text-center" id="title">Express Project</h2>
			
			<div className="row">
				<div className="col-md-5">
						<fieldset>							
							<p className="text-uppercase pull-center"> SIGN UP.</p>	
 							<div className="form-group">
								<input type="text" placeholder="username" onChange={(e) => {setUsername(e.target.value)}}/>
							</div>

							<div className="form-group">
								<input type="email"  placeholder="Email Address" onChange={(e) => {setUserEmail(e.target.value)}}/>
							</div>
							<div className="form-group">
								<input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} />
							</div>
								<div className="form-group">
								<input type="password" name="password2" id="password2" className="form-control input-lg" placeholder="Password2" onChange={(e) => {setConfirmPassword(e.target.value)}}/>
							</div>
							<div className="form-check">
								<label className="form-check-label">
								  <input type="checkbox" className="form-check-input"/>
								  By Clicking register you're agree to our policy & terms
								</label>
							  </div>
 							<div>
 									  <input type="submit" className="btn btn-lg btn-primary"   value="Register" onClick={register}/>
 							</div>
              <h1>{registerStatus}</h1>
						</fieldset>
					
				</div>
				
				<div className="col-md-2">
				</div>
				
				<div className="col-md-5">
 				
						<fieldset>							
							<p className="text-uppercase"> Login using your account: </p>	
 								
							<div className="form-group">
								<input type="email"  placeholder="username" onChange={(e) => {setLoginUsername(e.target.value)}}/>
							</div>
							<div className="form-group">
								<input type="password"  placeholder="Password" onChange={(e) => {setLoginPassword(e.target.value)}}/>
							</div>
							<div>
								<input type="submit" className="btn btn-md" value="Sign In" onClick={login}/>
							</div>
								 
 						</fieldset>
             <h1>{loginStatus}</h1>
				</div>
			</div>
		</div>
		
	</div>
  
    </div>
  )
}

export default App
