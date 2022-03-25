import React,{useState,useEffect} from 'react'
import {FaArrowLeft} from 'react-icons/all'
import { isAuthenticated } from '../Auth/helper/authApiCalls'
import { getUser } from './helper/userApiCalls'
import OrderItem from './OrderItem'

function Orders({
    openActive = undefined,
    setOpenActive = f=> f
}) {

    const [orders,setOrders] = useState([])
    const [error,setError] = useState(false)

    const {user} = isAuthenticated()

    const preload = (next) => {
        getUser(user._id).then(data=>{
            if(data){
                if(data.error){
                    setError(data.error)
                }
                setOrders(data.purchases)
                console.log(data.purchases);
            }
        })
    }

    useEffect(()=>{
        preload()
    },[])

    return (
        <div className="orders__container">
            <header className="sectionHeader ordersHeader">
            <i className="orders__goback" onClick={()=>setOpenActive('profileCard')}><FaArrowLeft /></i>
            <p className="orders__title">My Orders</p>
            </header>
            <div className="orders__all">
                {
                    orders ? orders.length > 0 ? (
                        orders.map((order,index)=>(
                            <OrderItem order={order} key={index} />
                        ))
                    ) : (<h1 className="text__align__center mt__100 orders__notFound">No Orders found</h1>) : ''
                }
            </div>
        </div>
    )
}

export default Orders
