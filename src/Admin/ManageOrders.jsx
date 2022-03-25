import React,{useState,useEffect} from 'react'
import { toast } from 'react-toastify'
import { deleteOrderDev, getAllOrdersDev } from '../Developer/helper/developerApiCalls'
import {CgClose} from 'react-icons/cg'
import {ImBin2} from 'react-icons/im'
import {AiFillEdit} from 'react-icons/ai'
import EditOrder from './EditOrder'
import { deleteOrderAdmin, getAllOrdersAdmin } from './helper/adminApiCalls'
import { deleteOrderSeller, getPlacedOrdersSeller } from '../Seller/helper/sellerApiCalls'
import ViewOrder from '../Core/ViewOrder'

const ManageOrders = ({setOpenAction=f=>f,user,token}) => {
    const [orders,setOrders] = useState([])
    const [openEdit,setOpenEdit] = useState({
        isOpen: false,
        item: undefined
    })

    const [refresh,setRefresh] = useState(false)
    const [viewOrder,setViewOrder] = useState(false)

    const preload = () => {
        if(user.role === 5){
            getAllOrdersDev(user._id,token).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: "dark"})
                    }else{
                        setOrders(data)
                        console.log(data);
                    }
                }
            })
        }else if(user.role === 2){
            getAllOrdersAdmin(user._id,token).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: "dark"})
                    }else{
                        setOrders(data)
                        console.log(data);
                    }
                }
            })
        }else{
            getPlacedOrdersSeller(user._id).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: "dark"})
                    }else{
                        let sortedData = []
                        if(data.length > 0) {
                            data.map((order)=>{
                                order.products.map(product=>{
                                    if(product.seller === user._id){
                                        sortedData = [...sortedData,order]
                                    }
                                })
                            })
                        }

                        setOrders(sortedData)
                        console.log(data);
                    }
                }
            })
        }
    }

    useEffect(()=>{
        preload()
    },[refresh])

    const handleDelete = orderId => e => {
        e.preventDefault()
        if(user.role === 5){
            deleteOrderDev(user._id,orderId,token).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: "dark"})
                    }else{
                        toast.success("Order Deleted.",{theme: "dark"})
                        setRefresh(!refresh)
                    }
                }
            })
        }else if(user.role ===2){
            deleteOrderAdmin(user._id,orderId,token).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: "dark"})
                    }else{
                        toast.success("Order Deleted.",{theme: "dark"})
                        setRefresh(!refresh)
                    }
                }
            })
        }else{
            deleteOrderSeller(user._id,orderId,token).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: "dark"})
                    }else{
                        toast.success("Order Deleted.",{theme: "dark"})
                        setRefresh(!refresh)
                    }
                }
            })
        }
    }
    const handleEdit = order => {
        setOpenEdit({...openEdit,isOpen: true,item: order})
    }

    const handleNoAuth = e =>{
        toast.error("Not Authorized!",{theme: "dark"})
    }

  return (
    <>
        {
            !viewOrder ? (
                <div className="productForm__container myProducts__container">
                    <div className="product__form__header myProducts__header">
                    <h2 className="product__form__title">Manage Orders</h2>
                    {/* TODO: Optional Feature -- Filter orders by status */}
                    {/* <select name="" id="">
                        <option>LOL</option>    
                    </select> */}
                    <i className="product__form__close" onClick={e=>setOpenAction(false)}><CgClose /></i>
                    </div>
                    <div className="myProducts__body">
                        {
                            orders.length > 0 && (
                                orders.map((order,index)=>(
                                    <React.Fragment key={index}>
                                        <div className="myProducts__item" style={{
                                            gridTemplateColumns: "0.7fr 1.3fr 1fr"
                                            }} key={index}>
                                            <div className="myProducts__item__info" 
                                            onClick={e=>setViewOrder(order)}
                                            style={{
                                                overflow: "hidden",
                                                height: "90%"
                                            }}>
                                                {
                                                    order.products.map((product,index2)=>(
                                                        <h3 className="myProducts__item__name" style={{
                                                            fontSize: "12px",
                                                            maxWidth: "70%"
                                                        }} key={index2}>{product.name}</h3>
                                                    ))
                                                }
                                            </div>
                                            <div className="myProducts__item__info" onClick={e=>setViewOrder(order)}>
                                                <h3 className="myProducts__item__name" style={{fontSize: "16px"}}>{order.products.length} {order.products.length > 1 ? ("Products") : ("Product")} | Method: {order.method}</h3>
                                                <h4 className="myProducts__item__price">Rs.{order.amount} | Status: <div className='Status__indicator' style={
                                                    order.status === "Cancelled" ? {
                                                        backgroundColor: "#ff0000",
                                                        boxShadow: "0px 0px 10px #ff0000"
                                                    } : 
                                                    order.status === "Delivered" ? {
                                                        backgroundColor: "#03a9f4",
                                                        boxShadow: "0px 0px 10px #03a9f4"} : 
                                                    order.status === "Processing" ? {
                                                        backgroundColor: "#ffeb3b",
                                                        boxShadow: "0px 0px 10px #ffeb3b"} : {}
                                                }></div> {order.status}</h4>
                                            </div>
                                            <div className="myProducts__item__manage">
                                                {
                                                    user.role > 1 ? (
                                                        <div className="myProducts__item__edit" onClick={e=>handleDelete(order._id)(e)}><ImBin2 /></div>
                                                    ) : (
                                                        <div className="myProducts__item__edit" onClick={e=>handleNoAuth(e)}><ImBin2 /></div>
                                                    )
                                                }
                                                <div className="myProducts__item__edit myProducts__item__delete"  onClick={e=>handleEdit(order)}><AiFillEdit /></div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))
                            )
                        }
                    </div>
                </div>
            ) : (
                <ViewOrder setRefresh={setRefresh} refreshh={refresh} setOpen={setViewOrder} user={user} token={token} order={viewOrder} location="order" />
            )
        }
        {
            openEdit.isOpen && (<EditOrder user={user} token={token} setOpenAction={setOpenEdit} order={openEdit.item} setRefresh={setRefresh} refresh={refresh} />)
        }
    </>
  )
}

export default ManageOrders