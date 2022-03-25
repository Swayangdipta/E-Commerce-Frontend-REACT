import React,{useState,useEffect} from 'react'
import Header from '../Core/Header'
import {isAuthenticated, signup } from './helper/authApiCalls'
import {FiMail,FaShieldAlt,IoChevronForwardOutline,FaRegUser,IoLocationOutline,BsTelephone} from 'react-icons/all'
import {Link,Redirect} from 'react-router-dom'
// import bg from '../assets/image/Animated Shape.svg'
import {toast} from 'react-toastify'
import { createAddress } from '../Core/helper/coreApiCalls'


export default function SignInForm() {

    const [isNextOpen,setIsNextOpen] = useState(false)
    const [credentials,setCredentials] = useState({
        email: '',
        password: '',
        name: '',
        photo: '',
        address: '',
        formData: new FormData(),
        imageUrl: undefined
    })

    const [address,setAddress] = useState({
        line1: '',
        state: '',
        city: '',
        pincode: '',
        landmark: '',
        contact: '',
        name: ''
    })
    const [res,setRes] = useState({
        redirect: false,
        error: false,
        success: false
    })

    const [validationError,setValidationError] = useState('')

    const {email,password,name,photo} = credentials
    const {line1,state,city,pincode,landmark,contact} = address

    const handleChange = (name) => (e) =>{
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        credentials.formData.set(name,value)
        setCredentials({...credentials,[name]: value})
        if(name === 'photo'){
            let file = URL.createObjectURL(e.target.files[0])
            setCredentials({...credentials,imageUrl: file})
        }
        console.log(credentials);
    }

    const {user,token} = isAuthenticated()

    const handleAddress = (name) => (e) =>{
        setAddress({...address,[name]: e.target.value})
    }

    const handleAddressSubmit = e => {
        e.preventDefault()
        // console.log(address);
        if(address.name == '' || line1 == '' || state == '' || city == '' || pincode == '' || landmark == '' || contact == ''){
            console.log('Required');
            return toast.warn("All Fields are required.",{theme: 'dark'})
        }else if(contact.length < 10 && contact.length > 13){
            // console.log('length');
            return toast.warn('Contact must be between 10 to 13 characters.',{theme: 'dark'})
        }

        createAddress(address).then(data=>{
            if(data.error){
                return toast.error(data.error,{theme: "dark"})
            }
            toast.success("Address added successfully.",{theme: "dark"})
            setCredentials({...credentials,address: data._id})
            // console.log(credentials.formData)
            setTimeout(()=>{
                setIsNextOpen(true)
            },500)
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        credentials.formData.set('address',credentials.address)
        if( email == '' || password == '' || name == ''){
            return toast.warn("All Fields are required.",{theme: 'dark'})
        }else if(name.length < 3){
            return toast.warn('Name should be at least 3 characters.',{theme: 'dark'})
        }else if(password.length<8){
            return toast.warn('Password should be at least 8 characters.',{theme: 'dark'})
        }

        signup(credentials.formData).then(data=>{
            // console.log(data);
            if(data.error){
                return toast.error(data.error,{theme: "dark"})
            }
            // console.log(data);
            toast.success('Successfully registered.')
            setRes({...res,success: true,redirect: true})
        })
    }

    const addressForm = () => {
        return (
            <form>
                <label className="label" htmlFor="line1">Address line 1 *</label>
                <i className="icon signinIcons"><IoLocationOutline /></i>
                <input type="text" value={line1} className="email" id="line1" onChange={handleAddress("line1")} placeholder='Address line 1...' />
                
                <label className="label" htmlFor="city">City *</label>
                <i className="icon signinIcons"><IoLocationOutline /></i>
                <input type="text" value={city} className="email" id="city" onChange={handleAddress("city")} placeholder='City...' />

                <label className="label" htmlFor="state">State *</label>
                <i className="icon signinIcons"><IoLocationOutline /></i>
                <input type="text" value={state} className="email" id="state" onChange={handleAddress("state")} placeholder='State...' />

                <label className="label" htmlFor="pincode">Pincode *</label>
                <i className="icon signinIcons"><IoLocationOutline /></i>
                <input type="text" value={pincode} className="email" id="pincode" onChange={handleAddress("pincode")} placeholder='Pincode...' />

                <label className="label" htmlFor="landmark">Landmark *</label>
                <i className="icon signinIcons"><IoLocationOutline /></i>
                <input type="text" value={landmark} className="email" id="landmark" onChange={handleAddress("landmark")} placeholder='Landmark...' />

                <label className="label" htmlFor="phone">Phone No. *</label>
                <i className="icon signinIcons"><BsTelephone /></i>
                <input type="text" value={contact} className="email" id="phone" onChange={handleAddress("contact")} placeholder='Your Phone Number..' />

                <label className="label" htmlFor="customer">Deliver to *</label>
                <i className="icon signinIcons"><FaRegUser /></i>
                <input type="text" value={address.name} className="email" id="customer" onChange={handleAddress("name")} placeholder='Product delivers to...' />
                
                <button type="submit" className="signInBtn" onClick={e=>handleAddressSubmit(e)}>Submit & Next <IoChevronForwardOutline style={{fontSize:'25px'}}/></button>
            </form>
        )
    }

    const personalInfoForm = () => {
        return(
            <form>
                <label className="label" htmlFor="name">Name  *</label>
                <i className="icon signinIcons"><FaRegUser /></i>
                <input type="text" value={name} className="email" id="name" onChange={handleChange("name")} placeholder='Fullname..' />
                
                <label className="label" htmlFor="email">Email  *</label>
                <i className="icon signinIcons"><FiMail /></i>
                <input type="email" value={email} className="email" id="email" onChange={handleChange("email")} placeholder='Email address...' />
                
                <label className="label" htmlFor="password">Password *</label>
                <i className="icon signinIcons"><FaShieldAlt /></i>
                <input type="password" value={password} className="password" id="password" onChange={handleChange("password")} placeholder='Password...'/>
                
                <label className="label" htmlFor="photo">Photo *</label>
                <i className="icon signinIcons imageHolder">{credentials.imageUrl ? (<img src={credentials.imageUrl} className="icon signinIcons userImage" />):(<img src='https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?ssl=1' className="icon signinIcons userImage" />)}</i>
                <input type="file" className="password imageInput" id="photo" onChange={handleChange("photo")} placeholder='Password...'/>

                <button type="Submit" className="signInBtn" onClick={handleSubmit}>Register</button>
            </form>
        )
    }

    const preload = () => {
        // setCredentials({...credentials,formData: new FormData()})
    }

    useEffect(()=>{
        preload()
    },[])

    return (
        <div className="authContainer overrideAuth">
            {/* <img src={bg} className="bgImage" /> */}
            {token && (<Redirect to="/" />)}
            {res.redirect && (<Redirect to="/login" />)}
            <Header />
            <div className="signInForm signUpForm">
            {/* <img src={bg} className="bgImage" /> */}
                <h1 className="formTitile">Register</h1>
                <hr className="separator" />
                {
                    isNextOpen ? personalInfoForm() : addressForm()
                }
                {
                    isNextOpen ? ('') : (<span className="infoSpan">Already have an account?<Link to='/login' style={{color: '#fff',textDecoration: 'underline'}} className="link">Click here.</Link></span>)
                }
            </div>
        </div>
    )
}
