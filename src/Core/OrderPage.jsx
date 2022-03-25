import React from 'react'

function OrderPage({products,count=undefined}) {
    return (
        <div className="order__container">
            <div className="order__products__all">
                {
                    products.map((product,index)=>(
                        <h1 style={{color: '#fff'}}>{product.name}</h1>
                    ))
                }
            </div>
        </div>
    )
}

export default OrderPage
