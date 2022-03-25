import React,{useState} from 'react'
// import {FiMail,FaRegUser,FaShieldAlt} from 'react-icons/all'
import {FiMail,FaShieldAlt,IoChevronForwardOutline,FaRegUser,IoLocationOutline,BsTelephone} from 'react-icons/all'
import {FaArrowLeft} from 'react-icons/all'
import { toast } from 'react-toastify'
import { editUserAddressDev, editUserDev } from '../Developer/helper/developerApiCalls'
import { editUserAddressAdmin, editUserAdmin } from './helper/adminApiCalls'

const backend = process.env.REACT_APP_BACKEND



const EditUser = ({user,setOpenForm=f=>f,openForm,developerID,token,superUserRole,settRefresh=f=>f,refresh=undefined}) => {
    const [credentials,setCredentials] = useState({
        email: user.email,
        password: '',
        name: user.name,
        role: user.role,
        photo: '',
        address: user.address._id,
        formData: new FormData(),
        imageUrl: undefined
    })

    let defaultRole = () => {
        switch (user.role) {
            case 0:
                return "User"
            case 1:
                return "Seller"
            case 2:
                return "Admin"
            case 5:
                return "Developer"
            default:
                return "User"
        }
    }


    const [address,setAddress] = useState({
        line1: user.address.line1,
        state: user.address.state,
        city: user.address.city,
        pincode: user.address.pincode,
        landmark: user.address.landmark,
        contact: user.address.contact,
        name: user.address.name
    })

    const {line1,state,city,pincode,landmark,contact} = address

    const [addressForm,setAddressForm] = useState(false)

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

    const {name,email,password,formData,role} = credentials

    const handleSubmit = e => {
        e.preventDefault()
        if(superUserRole === 5){
            console.log("Inside Developer");
            editUserDev(developerID,user._id,token,formData).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: "dark"})
                    }else{
                        toast.success("User updated successfully.",{theme: "dark"})
                        settRefresh(!refresh)
                        console.log(data);
                        setCredentials({
                            ...credentials,
                            email: data.email,
                            name: data.name
                        })
                    }
                }
            })
        }else{
            console.log("Inside Admin");
            console.log(user);
            editUserAdmin(developerID,user._id,token,formData).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: "dark"})
                    }else{
                        toast.success("User updated successfully.",{theme: "dark"})
                        settRefresh(!refresh)
                        console.log(data);
                        setCredentials({
                            ...credentials,
                            email: data.email,
                            name: data.name
                        })
                    }
                }
            })
        }

    }

    const handleAddress = name => e => {
        setAddress({...address,[name]: e.target.value})
    }

    const handleAddressSubmit = e => {
        e.preventDefault()

        if(superUserRole === 5){
            editUserAddressDev(developerID,user.address._id,token,address).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: "dark"})
                    }else{
                        toast.success("Address updated.",{theme: "dark"})
                        console.log(data);
                    }
                }
            })
        }else{
            editUserAddressAdmin(developerID,user.address._id,token,address).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: "dark"})
                    }else{
                        toast.success("Address updated.",{theme: "dark"})
                        console.log(data);
                    }
                }
            })
        }

    }

    const editAddressForm = () => {
        return(
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
                
                <button type="submit" className="signInBtn" onClick={e=>handleAddressSubmit(e)} style={{background: 'linear-gradient(45deg, rgb(76, 175, 80), rgb(0, 150, 136))'}}>Update address</button>
                <button type="Submit"  className="signInBtn" onClick={e=>setOpenForm({...openForm,status: false})}>Cancel</button>
                <div className="signInBtn" onClick={e=> setAddressForm(false)} style={{background: 'linear-gradient(45deg, rgb(76, 175, 80), rgb(0, 150, 136))'}}>Edit Info</div>
            </form>
        )
    }

  return (
    <div className="flex_align_single_div_center">
    <div className="formContainer__EditUser">
        {
            addressForm ? (editAddressForm()) : (
                <form>
                    <label className="label" htmlFor="name">Name  *</label>
                    <i className="icon signinIcons"><FaRegUser /></i>
                    <input type="text" value={name} className="email" id="name" onChange={handleChange("name")} placeholder='Fullname..' />
                
                    <label className="label" htmlFor="email">Email  *</label>
                    <i className="icon signinIcons"><FiMail /></i>
                    <input type="email" value={email} className="email" id="email" onChange={handleChange("email")} placeholder='Email address...' />
                
                    <label className="label" htmlFor="email">New Password  *</label>
                    <i className="icon signinIcons"><FaShieldAlt /></i>
                    <input type="password" value={password} className="email" id="password" onChange={handleChange("password")} placeholder='New password...' />
                    
                    <label className="label" htmlFor="email">New Role  *</label>
                    <i className="icon signinIcons"><FaShieldAlt /></i>
                    <select className="password" onChange={handleChange("role")}>
                        <option value={role}>{defaultRole()}</option>
                        <option value={0}>User</option>
                        <option value={1}>Seller</option>
                        <option value={2}>Admin</option>
                        <option value={5}>Developer</option>
                    </select>

                    <label className="label" htmlFor="photo">Photo *</label>
                    <i className="icon signinIcons imageHolder">{credentials.imageUrl ? (<img src={credentials.imageUrl} className="icon signinIcons userImage" />):(<img src={`${backend}/user/image/${user._id}`} className="icon signinIcons userImage" />)}</i>
                    <input type="file" className="password imageInput" id="photo" onChange={handleChange("photo")} placeholder='Password...'/>
            
                    <button type="Submit" className="signInBtn" onClick={handleSubmit} style={{background: 'linear-gradient(45deg, rgb(76, 175, 80), rgb(0, 150, 136))'}}>Update</button>
                    <button type="Submit"  className="signInBtn" onClick={e=>{
                        setOpenForm({...openForm,status: false})
                        }}>Cancel</button>
                    <div className="signInBtn" onClick={e=> setAddressForm(true)} style={{background: 'linear-gradient(45deg, rgb(76, 175, 80), rgb(0, 150, 136))'}}>Edit Address</div>
                </form>
            )
        }
    </div>
    </div>
  )
}

export default EditUser