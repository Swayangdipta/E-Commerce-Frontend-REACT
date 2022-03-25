import React,{useState,useEffect} from 'react'
import Header from '../Core/Header'
import {isAuthenticated} from '../Auth/helper/authApiCalls'
import {IoChevronForwardOutline,FaRegUser,IoLocationOutline,BsTelephone} from 'react-icons/all'
import {Redirect} from 'react-router-dom'
// import bg from '../assets/image/Animated Shape.svg'
import {toast} from 'react-toastify'
import { createAddress } from '../Core/helper/coreApiCalls'
import { getUser, updateAddress } from './helper/userApiCalls'
import {FaArrowLeft} from 'react-icons/all'


export default function EditAddress({setOpenActive = f=>f}) {

    const [address,setAddress] = useState({
        line1: '',
        state: '',
        city: '',
        pincode: '',
        landmark: '',
        contact: '',
        name: ''
    })

    const [addressId,setAddressId] = useState('')

    const [res,setRes] = useState({
        redirect: false,
        error: false,
        success: false
    })

    const [validationError,setValidationError] = useState('')

    const {line1,state,city,pincode,landmark,contact} = address

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

        updateAddress(user._id,token,address,addressId).then(data=>{
            if(data){
                if(data.error){
                    setRes({...res,error: data.error,success: false})
                }else{
                    setRes({...res,error:false,success: 'Address updated.'})
                }
            }
        }).catch(e=>{
            setRes({...res,error:e,success:false})
        }).finally(()=>{
            setRes({...res,error: false,success:false})
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
                
                <button type="submit" className="signInBtn" onClick={e=>handleAddressSubmit(e)} style={{background: 'linear-gradient(45deg, rgb(76, 175, 80), rgb(0, 150, 136))'}}>Update <IoChevronForwardOutline style={{fontSize:'25px'}}/></button>
                <button type="Submit"  className="signInBtn" onClick={e=>setOpenActive('profileCard')}>Cancel</button>
            </form>
        )
    }


    const preload = () => {
        getUser(user._id).then(data=>{
            if(data){
                if(data.error){
                   return setRes({...res,error: data.error,success: false})
                }else{
                    setAddress({
                        ...address,
                        line1: data.address.line1,
                        state: data.address.state,
                        city: data.address.city,
                        pincode: data.address.pincode,
                        landmark: data.address.landmark,
                        contact: data.address.contact,
                        name: data.address.name
                    })

                    setAddressId(data.address._id)
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
                <p className='orders__title'>Edit Address</p>
            </header>
            <div className="authContainer overrideAuth editInfo">
            {!token && (<Redirect to="/" />)}
            <div className="signInForm signUpForm" style={{marginTop: '30px'}}>
                {
                    addressForm()
                }
            </div>
        </div>
        {
            res.error && (toast.error(res.error,{theme: 'dark'}))
        }        
        {
            res.success && (toast.success(res.success,{theme: 'dark'}))
        }
        </div>
    )
}
