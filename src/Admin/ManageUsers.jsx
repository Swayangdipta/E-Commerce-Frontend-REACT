import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { closeUserAccountDev, fetchUserDev } from '../Developer/helper/developerApiCalls'
import { closeUserAccount, fetchUsers } from './helper/adminApiCalls'
import {CgClose} from 'react-icons/cg'
import {ImBin2} from 'react-icons/im'
import {AiFillEdit} from 'react-icons/ai'
import EditUser from './EditUser'

const API = process.env.REACT_APP_BACKEND

const ManageUsers = ({userId,role,setOpenAction=f=>f,token,developerID}) => {

    const [users,setUsers] = useState([])
    const [openForm,setOpenForm] = useState({
        status: false,
        user: undefined
    })

    const [refresh,setRefresh] = useState(false)


    const preload = () => {
        if(role === 5){
            fetchUserDev(userId).then((data)=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme:"dark"})
                    }else{
                        setUsers(data)
                    }
                }
            })
        }else if(role === 2){
            fetchUsers(userId).then((data)=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme:"dark"})
                    }else{
                        setUsers(data)
                    }
                }
            })
        }else{
            return;
        }
    }

    useEffect(()=>{
        preload()
    },[refresh])

    const handleEdit = user => {
        setOpenForm({...openForm,status: true,user: user})
    }

    const handleDelete = _id => {
        
        let customerId = {
            _id: _id
        }

        if(role === 5){
            closeUserAccountDev(userId,customerId,token).then(data=>{
                console.log(JSON.stringify(customerId));
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: 'dark'})
                    }else{
                        toast.success("User account closed successfully.")
                        setUsers(                            
                            users.filter(function(customer){
                                return customer._id !== _id
                            })
                        )
                    }
                }
            })
        }else if(role ===2){
            closeUserAccount(userId,customerId,token).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: 'dark'})
                    }else{
                        toast.success("User account closed successfully.")
                    }
                }
            })
        }else{
            return;
        }
    }

  return (
    <div className="productForm__container myProducts__container">
    <div className="product__form__header myProducts__header">
      <h2 className="product__form__title">Manage Users</h2>
      <i className="product__form__close" onClick={e=>setOpenAction(false)}><CgClose /></i>
    </div>
    <div className="myProducts__body">
        {
            users.length > 0 && (
                users.map((user,index)=>(
                    <React.Fragment key={index}>
                    <div className="myProducts__item" key={index}>
                        <div className="myProducts__image__holder">
                            <img src={`${API}/user/image/${user._id}`} alt="" className="myProducts__item__image" />
                        </div>
                        <div className="myProducts__item__info">
                            <h3 className="myProducts__item__name">{user.name}</h3>
                            <h4 className="myProducts__item__price">{user.email} | {user.role === 5 ? ("DEVELOPER") : user.role === 2 ? ("ADMIN") : user.role === 1 ? ("SELLER") : user.role === 0 ? ("USER") : '' }</h4>
                        </div>
                        <div className="myProducts__item__manage">
                            <div className="myProducts__item__edit" onClick={e=>handleDelete(user._id)}><ImBin2 /></div>
                            <div className="myProducts__item__edit myProducts__item__delete"  onClick={e=>handleEdit(user)}><AiFillEdit /></div>
                        </div>
                    </div>
                    </React.Fragment>
                ))
            )
        }
    </div>
    {
        openForm.status && (<EditUser refresh={refresh} settRefresh={setRefresh} setOpenForm={setOpenForm} openForm={openForm} user={openForm.user} developerID={developerID} token={token} superUserRole={role} />)
    }
  </div>
  )
}

export default ManageUsers