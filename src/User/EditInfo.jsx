import React,{useState,useEffect} from 'react'
import Header from '../Core/Header'
import {isAuthenticated } from '../Auth/helper/authApiCalls'
import {FiMail,FaRegUser} from 'react-icons/all'
// import bg from '../assets/image/Animated Shape.svg'
import {toast} from 'react-toastify'
import { getUser, updateUser } from './helper/userApiCalls'
import {FaArrowLeft} from 'react-icons/all'
import {Redirect} from 'react-router-dom'


const backend = process.env.REACT_APP_BACKEND

export default function EditInfo({user,setOpenActive=f=>f}) {

    const [credentials,setCredentials] = useState({
        email: '',
        password: '',
        name: '',
        photo: '',
        address: '',
        formData: new FormData(),
        imageUrl: undefined
    })

    const [res,setRes] = useState({
        redirect: false,
        error: false,
        success: false
    })

    const [validationError,setValidationError] = useState('')

    const {email,name} = credentials

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

    const {token} = isAuthenticated()


    const handleSubmit = (e) =>{
        e.preventDefault()
        credentials.formData.set('address',credentials.address)
        if( email == '' ||  name == ''){
            return toast.warn("All Fields are required.",{theme: 'dark'})
        }else if(name.length < 3){
            return toast.warn('Name should be at least 3 characters.',{theme: 'dark'})
        }

        updateUser(user._id,token,credentials.formData).then(data=>{
            if(data){
                if(data.error){
                    setRes({...res,error: data.error,success: false})
                }else{
                    setRes({...res,error: false,success: true})
                }
            }
        })
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
                
                
                <label className="label" htmlFor="photo">Photo *</label>
                <i className="icon signinIcons imageHolder">{credentials.imageUrl ? (<img src={credentials.imageUrl} className="icon signinIcons userImage" />):(<img src='https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?ssl=1' className="icon signinIcons userImage" />)}</i>
                <input type="file" className="password imageInput" id="photo" onChange={handleChange("photo")} placeholder='Password...'/>

                <button type="Submit" className="signInBtn" onClick={handleSubmit} style={{background: 'linear-gradient(45deg, rgb(76, 175, 80), rgb(0, 150, 136))'}}>Update</button>
                <button type="Submit"  className="signInBtn" onClick={e=>setOpenActive('profileCard')}>Cancel</button>
            </form>
        )
    }

    const preload = () => {
        // setCredentials({...credentials,formData: new FormData()})
        getUser(user._id).then(data=>{
            if(data){
                if(data.error){

                }else{
                    console.log(data)
                    setCredentials({...credentials,
                        imageUrl: `${backend}/user/image/${user._id}`,
                        email: data.email,
                        name: data.name,
                        address: data.address._id
                    }) 
                }
            }
        })
    }

    useEffect(()=>{
        preload()
    },[])

    return (
    <div className='orders__container'>
        <header className='sectionHeader ordersHeader'>
            <i className='orders__goback' onClick={e=>setOpenActive('profileCard')}><FaArrowLeft /></i>
            <p className='orders__title'>Edit Info</p>
        </header>
        <div className="authContainer overrideAuth editInfo">
            {!token && (<Redirect to="/" />)}
            <div className="signInForm signUpForm" style={{marginTop: '30px'}}>
                {
                    personalInfoForm()
                }
            </div>
        </div>
        {
            res.error && (toast.error(res.error,{theme: 'dark'}))
        }
        {
            res.success && (toast.success("Info updated.",{theme: 'dark'}))
        }
    </div>
    )
}
