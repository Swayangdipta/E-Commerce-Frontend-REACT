import React,{useState} from 'react'
import Header from '../Core/Header'
import { signIn,authenticate,isAuthenticated } from './helper/authApiCalls'
import {FiMail,FaShieldAlt} from 'react-icons/all'
import {Link,Redirect} from 'react-router-dom'
import { toast } from 'react-toastify'


export default function SignInForm() {

    const [credentials,setCredentials] = useState({
        email: '',
        password: ''
    })
    const [res,setRes] = useState({
        redirect: false,
        error: false,
        success: false
    })

    const handleChange = (name) => (e) =>{
        setCredentials({...credentials,[name]: e.target.value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        signIn(credentials).then(response=>{
            if(response){
                if(response.error){
                    toast.error(response.error,{theme: "dark"})
                    setRes({...res,error: response.error})
                    return;
                }
                authenticate(response,()=>{
                    setRes({...res,success: true,redirect: true})
                })
            }
            
        })
    }

    const {user,token} = isAuthenticated()

    return (
        <div className="authContainer">
            {token && (<Redirect to="/" />)}
            {res.redirect && (<Redirect to="/profile" />)}
            <Header />
            <div className="signInForm">
                <h1 className="formTitile">Login</h1>
                <hr className="separator" />
                <form>
                    <label className="label" htmlFor="email">Email</label>
                    <i className="icon signinIcons"><FiMail /></i>
                    <input type="email" className="email" id="email" onChange={handleChange("email")} placeholder='Email address...' />
                    <label className="label" htmlFor="password">Password</label>
                    <i className="icon signinIcons"><FaShieldAlt /></i>
                    <input type="password" className="password" id="password" onChange={handleChange("password")} placeholder='Password...'/>
                    <button type="submit" className="signInBtn" onClick={handleSubmit}>Login</button>
                </form>
                <span className="infoSpan">Don't have an account? <Link to='/register' style={{color: '#fff',textDecoration: 'underline'}} className="link">Click here.</Link></span>
                {/* <div className="goSignUp">Sign Up</div> */}
            </div>
        </div>
    )
}
