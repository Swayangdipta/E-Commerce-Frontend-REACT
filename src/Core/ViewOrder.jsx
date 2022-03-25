import React,{useState,useEffect} from 'react'
import {CgClose} from 'react-icons/cg'
import { toast } from 'react-toastify'
import EditOrder from '../Admin/EditOrder'
import ManageShipment from '../Seller/ManageShipment'
import { cancelOrder, getUser } from '../User/helper/userApiCalls'
import ExpandedOrderItem from './ExpandedOrderItem'
import {FiAlertTriangle} from 'react-icons/all'


const ViewOrder = ({order,location="profile",user,token,setOpen=f=>f,setRefresh=f=>f ,refreshh=undefined}) => {
    const [items,setItems] = useState({
        refresh: 0,
        item: [...order.products]
    })

    const [openUpdate,setOpenUpdate] = useState(false)
    const [openMyShipment,setOpenMyShipment] = useState({
        status: false,
        shipment: []
    })

    const [fetchedUser,setFetchedUser] = useState(undefined)
    const [showCancel,setShowCancel] = useState(false)
    const [openConfirmation,setOpenConfirmation] = useState(false)
    const [countDown,setCountDown] = useState(6)
    

    const {item,refresh} = items

    useEffect(()=>{
        getUser(user._id).then(data=>{
            if(data){
                if(data.error){
                    toast.error(data.error,{theme:"dark"})
                }else{
                    setFetchedUser(data)
                }
            }
        })
        setItems({...items,item: order.products,refresh: refresh+1})
    },[])

    useEffect(()=>{
        setItems({...items,refresh: refresh+1})
        console.log("inside refresh");
        let tempShipments = []
        items.item.map(i=>{
            if(i.seller === user._id){
                tempShipments = [...tempShipments,i]
            }
        })
        setOpenMyShipment({...openMyShipment,shipment: tempShipments})
    },[item])
    useEffect(()=>{
        console.log(item);
        console.log(refresh);
    },[refresh])

    useEffect(()=>{
        if(fetchedUser != undefined){
            if(fetchedUser.purchases.length > 0){
                fetchedUser.purchases.map(item => {
                    if(item._id === order._id){
                        setShowCancel(true)
                    }
                })
            }else{
                setShowCancel(false)
            }
        }
    },[fetchedUser])
    useEffect(()=>{
        if(countDown >= 1){
            setTimeout(()=>{
                setCountDown(countDown-1)
            },1200)
        }
    },[countDown])
    
    const handleCancel = e=> {
        e.preventDefault()
        cancelOrder(order._id,user._id,token).then(data=>{
            if(data){
                if(data.error){
                    toast.error(data.error,{theme: 'dark'})
                }else{
                    toast.success("Order cancelled successfully.",{theme: 'dark'})
                    setOpenConfirmation(false)
                    setRefresh(!refreshh)
                    setOpen(false)
                }
            }
        })
    }

    const openConfirmBox = () => (
        <div className='confirmationHolder'>
            <div className="confirmationTab">
                <span className='confirmationHolder__text'>
                    <h1 className='confirmationHolder__warning'>Warning <FiAlertTriangle style={{marginTop: '3px'}} /></h1>
                    <p className='confirmationHolder__warning__para'>Are you sure you want to cancel this Order?</p>
                </span>
                <span className="confirmationHolder__btn">
                    <button className="confirmationHolder__agree" style={countDown >= 1 ? {
                        background: 'linear-gradient(45deg, #f78989, #ff5656)',
                        color: '#000',
                        fontSize: '20px'
                    } : {}} onClick={handleCancel} disabled={countDown>=1 ? true : false}>{
                        countDown >= 1 ? (countDown) : ("Yes! Cancel.")
                    }</button>
                    <button className="confirmationHolder__deny" onClick={e=>setOpenConfirmation(false)}>No! go back.</button>
                </span>
            </div>
        </div>
    )

  return (
    <div className='viewOrder__container'>
        {
            !openMyShipment.status && (
                <>
                <div className="viewOrder__close" style={{right: '0',left: "30px"}}>Order Details</div>
                    <div className="viewOrder__close" onClick={e=>{
                        setOpen(false)
                        setRefresh(!refreshh)
                        }}><CgClose /></div>
                    <div className="viewOrder__wrapper">
                        <div className="viewOrder__allInfo">
                            <h2 className="order__address__title">Deliver to:</h2>
                            <h2 className="order__delivers__to">{order.address.name}</h2>
                            <h3 className="order__address">Landmark: {order.address.landmark}</h3>
                            <h3 className="order__address">Address line: {order.address.line1}</h3>
                            <h3 className="order__address">City: {order.address.city}</h3>
                            <h3 className="order__address">State: {order.address.state}</h3>
                            <h3 className="order__address">Pincode: {order.address.pincode}</h3>
                            <h3 className="order__address">Mobile: {order.address.contact}</h3>
                            <h3 className="order__address">Status: <div className='Status__indicator' style={
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
                                            }></div> {order.status}</h3>
                            
                            <h2 className="order__address__title" style={{textDecoration: 'none',color: '#ffeb3b'}} >Amount: {order.amount}</h2>
                            <h2 className="order__address__title" style={{textDecoration: 'none',color: '#ffeb3b'}} >Payment Mode: {order.method}</h2>
                            <h4 className="order__address__title" style={{textDecoration: 'none',color: '#ffeb3b',fontSize: '18px'}} >Order ID: {order._id}</h4>
                        </div>
                        <div className="viewOrder__items">
                            <div className="viewOrder__close" style={{position:"relative",right: '0',left: "0px",top:"0px",fontSize: "30px"}}>Products</div>
                            {
                                item.length > 0 ? (
                                    item.map((product,index)=>(
                                        <React.Fragment key={index}>
                                            <ExpandedOrderItem item={product} index={index}/>
                                        </React.Fragment>
                                    ))
                                ) : ""
                            }
                        </div>
                    </div>

                    {
                        user.role > 1 && (
                            <>
                                <div className="update__Order__Status" style={{    
                                    background: "#673ab7",
                                    boxShadow: "0px 0px 10px 0px #673ab7",
                                    color: "white"}} 
                                    onClick={e=>setOpenMyShipment({...openMyShipment,status: true})}>My Shipment Status</div>

                                <div className="update__Order__Status" onClick={e=>setOpenUpdate(true)}>Update Order Status</div>
                            </>
                        )
                    }
                    {
                        fetchedUser && showCancel && (
                            <div className="cancelOrderBuyer" onClick={e=>setOpenConfirmation(true)}>Cancel Order</div>
                        )
                    }
                    {
                        openConfirmation && (openConfirmBox())
                    }
                </>
            )
        }
    
        {
            openUpdate && (<EditOrder token={token} order={order} setOpenAction={setOpenUpdate} user={user} />)
        }
        {
            openMyShipment.status && (<ManageShipment refresh={refresh} setRefresh={setRefresh} originalOrderId={order._id} shipments={openMyShipment.shipment} openAction={openMyShipment} setOpenAction={setOpenMyShipment}/>)
        }
    </div>
  )
}

export default ViewOrder