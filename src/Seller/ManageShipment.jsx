import React from 'react'
import ExpandedOrderItem from '../Core/ExpandedOrderItem'
import {CgClose} from 'react-icons/cg'


const ManageShipment = ({setOpenAction=f=>f,openAction,shipments,originalOrderId=undefined,refresh=undefined,setRefresh=f=>f}) => {
  return (
    <div className="productForm__container myProducts__container">
        <div className="product__form__header myProducts__header">
        <h2 className="product__form__title">Manage Orders</h2>
        {/* TODO: Optional Feature -- Filter orders by status */}
        {/* <select name="" id="">
            <option>LOL</option>    
        </select> */}
        <i className="product__form__close" onClick={e=>setOpenAction({...openAction,status: false})}><CgClose /></i>
        </div>
        <div className="myProducts__body">
            {
                shipments.map((item,index)=>(
                    <ExpandedOrderItem refresh={refresh} setRefresh={setRefresh} originalOrderId={originalOrderId} item={item} index={index} from='shipment' />
                ))
            }
        </div>
    </div>
  )
}

export default ManageShipment