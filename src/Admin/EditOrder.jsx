import React,{useState,useEffect} from 'react'
import { toast } from 'react-toastify'
import {CgClose} from 'react-icons/all'
import { getAllOrderStatusEnums, updateOrderStatus } from '../Developer/helper/developerApiCalls'
import { getAllOrderStatusEnumsSeller, updateOrdersProductStatus, updateOrderStatusSeller } from '../Seller/helper/sellerApiCalls'
import { getAllOrderStatusEnumsAdmin, updateOrderStatusAdmin } from './helper/adminApiCalls'

const EditOrder = ({originalOrderId,user,order,setOpenAction=f=>f,token,setRefresh=f=>f,refresh=undefined,from="order"}) => {

    const [orderStatusEnums,setOrderStatusEnums] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [status,setStatus] = useState({
        orderId: order._id,
        status: order.status
    })


    const preload = () => {
        if(user.role === 5) {
            getAllOrderStatusEnums(user._id).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: 'dark'})
                    }else{
                        console.log(data);
                        setOrderStatusEnums(data)
                    }
                }
            })
        }else if(user.role === 2) {
            getAllOrderStatusEnumsAdmin(user._id).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: 'dark'})
                    }else{
                        console.log(data);
                        setOrderStatusEnums(data)
                    }
                }
            })
        }else{
            getAllOrderStatusEnumsSeller(user._id).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: 'dark'})
                    }else{
                        console.log(data);
                        setOrderStatusEnums(data)
                    }
                }
            })
        }
    }


    const handleUpdate = e => {
        e.preventDefault()

        setIsLoading(true)
        if(user.role === 5){
            updateOrderStatus(user._id,token,status).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: 'dark'})
                    }else{
                        toast.success("Status Updated.",{theme: 'dark'})
                        setRefresh(!refresh)
                    }
                }
            })
        }else if(user.role === 2){
            updateOrderStatusAdmin(user._id,token,status).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: 'dark'})
                    }else{
                        toast.success("Status Updated.",{theme: 'dark'})
                        setRefresh(!refresh)
                    }
                }
            })
        }else{
            updateOrderStatusSeller(user._id,token,status).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: 'dark'})
                    }else{
                        toast.success("Status Updated.",{theme: 'dark'})
                        setRefresh(!refresh)
                    }
                }
            })
        }
        setIsLoading(false)
    }

    const handleUpdateShipment = e =>{
        e.preventDefault()
        console.log(user);
        updateOrdersProductStatus(user._id,token,originalOrderId,order._id,status.status).then(data=>{
            if(data){
                if(data.error){
                    toast.error(data.error,{theme: 'dark'})
                }else{
                    toast.success("Status Updated.",{theme: 'dark'})
                    setRefresh(!refresh)
                }
            }
        })
    }

    useEffect(()=>{
        preload()
    },[])

  return (
    <div className="productForm__container category__container" style={{
        position: "fixed"
    }}>
    <div className="product__form__header">
      <h2 className="product__form__title">Update Order</h2>
      <i className="product__form__close" onClick={e=>setOpenAction(false)}><CgClose /></i>
    </div>

    <form className="productForm">

        <label htmlFor="status" className="product__label">Status</label>
        <select name="status" className='product__input' onChange={e=>setStatus({...status,status: e.target.value})}>
            <option>{order.status}</option>
            {
                orderStatusEnums.length > 0 ? (
                    orderStatusEnums.map((enumValue,index)=>(
                        <option value={enumValue} key={index}>{enumValue}</option>
                    ))
                ) : ""
            }
        </select>

        {
            from !== "order" ? (
                <button onClick={handleUpdateShipment} type='submit' className="product__form__submit">{isLoading ? ("Updating...") : ('Update')}</button>
            ) : (
                <button onClick={handleUpdate} type='submit' className="product__form__submit">{isLoading ? ("Updating...") : ('Update')}</button>
            )
        }
    </form>
  </div>
  )
}

export default EditOrder