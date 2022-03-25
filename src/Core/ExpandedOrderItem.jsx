import React, { useState ,useEffect} from 'react'
import { toast } from 'react-toastify'
import { getSingleProduct } from './helper/coreApiCalls'
import ViewItem from './ViewItem'
import loader from '../assets/image/Ripple-1s-200px.svg'
import EditOrder from '../Admin/EditOrder'
import {isAuthenticated} from '../Auth/helper/authApiCalls'

const API = process.env.REACT_APP_BACKEND 


const ExpandedOrderItem = ({item,index,from="order",originalOrderId=undefined,refresh=undefined,setRefresh=f=>f}) => {

  const [product,setProduct] = useState(undefined)
  const [isItemOpen,setIsItemOpen] = useState(false)
  const [editOrder,setEditOrder] = useState(false)

  const {user,token} = isAuthenticated()


  useEffect(()=>{
    console.log(item);
    getSingleProduct(item.product).then(data=>{
      if(data){
        if(data.error){
          toast(data.error,{theme: "dark"})
        }else{
          setProduct(data)
        }
      }
    })
  },[])

  return (
    <>
      {
        product && (
          <div className="myProducts__item" style={from==="shipment"? {background: "#000"} : {background: "#222"}} key={index}>
              <div className="myProducts__image__holder">
                  <img src={`${API}/product/single/photo/${product._id}?photo=${product.photos[0]._id}`} alt="" className="myProducts__item__image" />
              </div>
              <div className="myProducts__item__info">
                  <h3 className="myProducts__item__name">{product.name}</h3>
                  <h4 className="myProducts__item__price">{product.price} {item.status ? (<>
                    | <div className='Status__indicator' style={
                        item.status === "Cancelled" ? {
                            backgroundColor: "#ff0000",
                            boxShadow: "0px 0px 10px #ff0000"
                        } : 
                        item.status === "Delivered" ? {
                            backgroundColor: "#03a9f4",
                            boxShadow: "0px 0px 10px #03a9f4"} : 
                        item.status === "Processing" ? {
                            backgroundColor: "#ffeb3b",
                            boxShadow: "0px 0px 10px #ffeb3b"} : {}
                    }></div> {item.status}
                  </>) : ''} </h4>
              </div>
              <div className="myProducts__item__manage">
                {
                  from !== "shipment" ? (
                    <>
                      <div className="myProducts__item__edit" style={{textAlign: 'center',padding: "0 10px 0 5px"}}>{item.count}&nbsp; items</div>
                      <div className="myProducts__item__edit myProducts__item__delete" style={{textAlign: 'center',padding: '0 5px'}}>Total:&nbsp; Rs.{item.price}</div>
                    </>
                  ) : (
                    <>
                      <div className="myProducts__item__edit" style={{textAlign: 'center',padding: "0 10px 0 5px"}}></div>
                      <div className="myProducts__item__edit myProducts__item__delete" style={{textAlign: 'center',padding: '0 5px'}} onClick={e=>setEditOrder(true)}>Update</div>
                    </>
                  )
                }

              </div>
          </div>
        )
      }
      {
      isItemOpen && (<ViewItem location="order" product={product} setOpenActive={setIsItemOpen} openActive={isItemOpen} photo={`${API}/product/single/photo/${product._id}?photo=${product.photos[0]._id}`} />)
      }
      {
        editOrder && (<EditOrder refresh={refresh} setRefresh={setRefresh} from='shipment' originalOrderId={originalOrderId} user={user} token={token} order={item} setOpenAction={setEditOrder} />)
      }
    </>
  )
}

export default ExpandedOrderItem