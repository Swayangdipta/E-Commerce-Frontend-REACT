import React, { useEffect, useState } from 'react'
import Header from '../Core/Header'
import Footer from '../Core/Footer'
import { getOrderFromLocalStorage } from '../User/helper/userUtility'

function Checkout() {
    const [product,setProduct] = useState(undefined)

    const loadItem = ()=>{
        let order = getOrderFromLocalStorage()
        setProduct(order)
        console.log(order);
    }

    useEffect(()=>{
        loadItem()
    },[])

    return (
        <>
            <Header location='dashboard' />



            <Footer />
        </>
    )
}

export default Checkout
