import React,{ useState }  from 'react'
import { isAuthenticated } from '../Auth/helper/authApiCalls'
import ViewOrder from '../Core/ViewOrder'

function OrderItem({order}) {
    const [openDetails,setOpenDetails] = useState(false)
    const {user,token} = isAuthenticated()
    return (
        <>
        {
            openDetails ? (
                <ViewOrder order={order} user={user} token={token} setOpen={setOpenDetails} />
            ) : (
                <div className='myOrder__item' onClick={e=>setOpenDetails(true)} >
                    {
                        order.products.map((product,index)=>(
                            <p style={index%2 !== 0 ? {background: '#1c1c1c'} : {}} className='myOrder__product__name' key={index}>{product.name}</p>
                        ))
                    }
                    <p style={{marginTop: '10px'}} className='myOrder__product__name'>Amount: {order.amount}</p>
                    <span className='myOrder__status__holder'>
                        <div className='myOrder__status__indicator'></div>
                        <p style={{textIndent: '0',marginTop: '3px',marginLeft: '5px'}} className='myOrder__status'>{order.status}</p>
                    </span>
                    <div className="myOrder__viewOrder">
                        Details
                    </div>      
                </div>
            )
        }

        </>
    )
}

export default OrderItem
