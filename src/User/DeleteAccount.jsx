import React,{useState,useEffect} from 'react'
import {FiAlertTriangle} from 'react-icons/all'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import { isAuthenticated, signout } from '../Auth/helper/authApiCalls'
import { deleteUserAccountSelf } from './helper/userApiCalls'

function DeleteAccount({setActiveComponent=f=>f}) {

    const [countDown,setCountDown] = useState(10)
    const [res,setRes] = useState({
        error: false,
        success: false,
        redirect: true
    })

    const {user,token} = isAuthenticated()

    useEffect(()=>{
        if(countDown >= 1){
            setTimeout(()=>{
                setCountDown(countDown-1)
            },1200)
        }
    },[countDown])

    const handleDelete = e => {
        if(countDown >=1){
            // console.log(countDown);
        }else{
            // console.log('else '+countDown);
            deleteUserAccountSelf(user._id,token).then(data=>{
                if(data){
                    if(data.error){
                        setRes({...res,success:false,error: data.error,redirect: false})
                    }else{
                        signout()
                        setRes({...res,success:true,error: false,redirect: true})
                    }
                }
            })

        }
        setRes({...res,success:false,error: false,redirect: false})
    }

    return (
        <div className='confirmationHolder'>
            <div className="confirmationTab">
                <span className='confirmationHolder__text'>
                    <h1 className='confirmationHolder__warning'>Warning <FiAlertTriangle style={{marginTop: '3px'}} /></h1>
                    <p className='confirmationHolder__warning__para'>Are you sure you want to delete your account?</p>
                </span>
                <span className="confirmationHolder__btn">
                    <button className="confirmationHolder__agree" style={countDown >= 1 ? {
                        background: 'linear-gradient(45deg, #f78989, #ff5656)',
                        color: '#000',
                        fontSize: '20px'
                    } : {}} onClick={handleDelete} disabled={countDown>=1 ? true : false}>{
                        countDown >= 1 ? (countDown) : ("Yes! Delete.")
                    }</button>
                    <button className="confirmationHolder__deny" onClick={e=>setActiveComponent(false)}>No! go back.</button>
                </span>
            </div>
            {
                res.error && toast.error(res.error,{theme: 'dark'})
            }
            {
                res.success && res.redirect && (<Redirect to='/' />)
            }
        </div>
    )
}

export default DeleteAccount
