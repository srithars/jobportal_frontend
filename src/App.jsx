import React, { Component } from 'react';
import './App.css';
import { BASEURL, callApi, setSession } from './api';

class App extends Component {
    showPopup()
    {
        signinpage.style.display = "block";
        signuppage.style.display = "none";
        popup.style.display = "block";
    }
    closePopup(event)
    {
        if(event.target.id === "popup")
            popup.style.display = "none";
    }
    showSignUp()
    {
        signinpage.style.display = "none";
        signuppage.style.display = "block";
        popup.style.display = "block";
    }
    signUp()
    {
        fullname.style.border = "";
        emailid.style.border = "";
        role.style.border = "";
        password.style.border = "";
        confirmpassword.style.border = "";
        if(fullname.value === "")
        {
            fullname.style.border = "1px solid red";
            fullname.focus();
            return;
        }
        if(emailid.value === "")
        {
            emailid.style.border = "1px solid red";
            emailid.focus();
            return;
        }
        if(role.value === "")
        {
            role.style.border = "1px solid red";
            role.focus();
            return;
        }
        if(password.value === "")
        {
            password.style.border = "1px solid red";
            password.focus();
            return;
        }
        if(confirmpassword.value === "")
        {
            confirmpassword.style.border = "1px solid red";
            confirmpassword.focus();
            return;
        }
        if(password.value !== confirmpassword.value)
        {
            alert("Password and Confirm Password are not matched");
            password.style.border = "1px solid red";
            password.focus();
            return;
        }

        let data = JSON.stringify({
            fullname: fullname.value,
            emailid: emailid.value,
            role: role.value,
            password: password.value
        });
        callApi("POST", BASEURL + "user/signup", data, this.signupResponse);
    }
    signupResponse(response)
    {
        let data = response.split("::");
        alert(data[1]);
    }
    forgotPassword()
    {
        signinusername.style.border = "";
        if(signinusername.value === "")
        {
            signinusername.style.border = "1px solid red";
            signinusername.focus();
            return;
        }
        let data = JSON.stringify({
            emailid : signinusername.value
        });
        callApi("POST", BASEURL + "user/forgotpassword", data, this.forgotPasswordResponse)
    }
    forgotPasswordResponse(response)
    {
        let data = response.split("::");
        //alert(data[1]);
        if(data[0] === "200")
            resp.style.color = "green";
        else
            resp.style.color = "red";

        resp.innerHTML = "<br/>" + data[1];
    }
    signIn()
    {
        signinusername.style.border = "";
        signinpassword.style.border = "";
        if(signinusername.value === "")
        {
            signinusername.style.border = "1px solid red";
            signinusername.focus();
            return;
        }
        if(signinpassword.value === "")
        {
            signinpassword.style.border = "1px solid red";
            signinpassword.focus();
            return;
        }
        let data = JSON.stringify({
            emailid: signinusername.value,
            password: signinpassword.value
        });
        callApi("POST", BASEURL + "user/signin", data, this.signInResponse);
    }
    signInResponse(response)
    {
        let data = response.split("::");
        if(data[0] === "200")
        {
            setSession("CSRID", data[1], 1);
            window.location.replace("/dashboard");
        }
        else
        {
            resp.style.color = "red";
            resp.innerHTML = "<br/>" + data[1];
        }
    }
    render() {
        return (
            <div id='container'>
                <div id='popup' onClick={(event)=>this.closePopup(event)}>
                    <div id='popupWindow'>
                        <div id='signinpage'>
                            <div className='signinTitle'>Login</div>
                            <div className='signindiv'>
                                <label className='usernamelabel'>Username*</label>
                                <input id='signinusername' type='text' />
                                <label className='passwordlabel'>Password*</label>
                                <input id='signinpassword' type='password' />
                                <div className='forgotpassword'>
                                    <label>Forgot </label>
                                    <label className='forgotpasswordlabel' onClick={()=>this.forgotPassword()}>Password?</label>
                                </div>
                                <button onClick={()=>this.signIn()}>Sign In</button>
                                <div className='spacediv' id='resp'></div>
                                <div className='createaccount'>
                                    <label>Don't have an account?</label>
                                    <label className='signupnowlabel' onClick={()=>this.showSignUp()}>SIGN UP NOW</label>
                                </div>
                            </div>
                        </div>
                        <div id='signuppage'>
                            <div className='signupTitle'>Create new account</div>
                            <div className='signupdiv'>
                                <label>Full Name*</label>
                                <input id='fullname' type='text' />
                                <label>Email ID*</label>
                                <input id='emailid' type='text' />
                                <label>Select Role*</label>
                                <select id='role'>
                                    <option value=''></option>
                                    <option value='1'>Admin</option>
                                    <option value='2'>Employer</option>
                                    <option value='3'>Job Seeker</option>
                                </select>
                                <label>Password*</label>
                                <input id='password' type='password' />
                                <label>Confirm Password*</label>
                                <input id='confirmpassword' type='password' />
                                <button onClick={()=>this.signUp()}>Register</button>
                                <div className='signinnavigation'>
                                    <span>Already have an account? </span>
                                    <span className='signinspan' onClick={()=>this.showPopup()}>SIGN IN</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='header'>
                    <img className='logo' src='/logo.png' alt='' />
                    <div><span>Job</span> Portal</div>
                    <img className='signin' onClick={()=>this.showPopup()} src='/user.png' alt='' />
                    <label onClick={()=>this.showPopup()}>SingIn</label>
                </div>
                <div id='content'>
                    <label className='text1'>INDIA'S #1 JOB PLATFORM</label>
                    <label className='text2'>Your job search ends here</label>
                    <label className='text3'>Discover career opportunities</label>
                    <div>
                        <input type='text' className='searchSkill' placeholder='Search jobs by "Skill"' />
                        <input type='text' className='searchLocation' placeholder='Job Location' />
                        <button>Search jobs</button>
                    </div>
                </div>
                <div id='footer'>
                    <label>Copyright@2025. All rights reserved.</label>
                    <img src='/facebook.png' alt='' />
                    <img src='/twitter.png' alt='' />
                    <img src='/linkedin.png' alt='' />
                </div>
            </div>
        );
    }
}

export default App;
