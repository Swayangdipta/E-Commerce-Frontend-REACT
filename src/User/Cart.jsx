import React,{useState,useEffect} from 'react'
import Header from '../Core/Header'
import Footer from '../Core/Footer'
import { emptyTheCart, loadItemsFromCart } from './helper/userUtility'
import { toast } from 'react-toastify'
import Item from '../Core/Item'
import {v4} from 'uuid'
import { getUser, placeOrder, pushOrderIntoPurchaseList } from './helper/userApiCalls'
import { isAuthenticated } from '../Auth/helper/authApiCalls'
import loader from '../assets/image/Rolling-1s-200px.svg'


function Cart() {
    const [products,setProducts] = useState([])
    const [userAddress,setUserAddress] = useState([])
    const [error,setError] = useState(false)
    const [reload,setReload] = useState(false)
    const [loading,setLoading] = useState(false)
    const [totalPrice,setTotalPrice] = useState(0)
    const [payment,setPayment] = useState({
        method: undefined
    })

    const {user,token} = isAuthenticated()
    const loadItems = () => {
        setProducts(loadItemsFromCart())
        let sum = 0
        loadItemsFromCart().map(item=>{
            sum += item.price * item.count
        })
        setTotalPrice(sum)
    }

    const loadAddress = () =>{
        getUser(user._id).then(data=>{
            if(data){
                if(data.error){
                    toast.error(data.error,{theme: 'dark'})
                }else{
                    setUserAddress(data.address)
                    console.log(data.address)
                }
            }
        })
    }

    const handleClick = e => {
        setPayment({...payment,method: e.target.value})
        console.log(e.target.value);
    }

    const handleSubmit = e => {
        setLoading(true)
        e.preventDefault();

        if(products.length > 0){
            if(payment.method === undefined){
                toast.error("Please select a payment option.",{theme: 'dark'})
            }else if(payment.method === 'COD'){
                let items = []
                let date = Date.now()
                products.map(i => {
                    if(i.seller){
                        items.push({
                            product: i._id,
                            name: i.name,
                            count: i.count,
                            price: i.price,
                            seller: i.seller._id
                        })
                    }else{
                        items.push({
                            product: i._id,
                            name: i.name,
                            count: i.count,
                            price: i.price
                        })
                    }
                })

                let order = {
                    products: items,
                    transaction_id: v4(),
                    amount: totalPrice,            
                    address: userAddress,
                    updated: date,                
                    user: user._id,
                    method: payment.method
                }

                placeOrder(user._id,token,order).then(data=>{
                    if(data){
                        if(data.error){
                            toast.error(data.error,{theme: 'dark'})
                        }else{
                            let orderId = ''
                            orderId = {
                                orderId: data._id
                            }
                            pushOrderIntoPurchaseList(user._id,token,orderId).then(data =>{
                                if(data){
                                    if(data.error){
                                        toast.error(data.error,{theme: 'dark'})
                                    }else{
                                        emptyTheCart()
                                        setReload(!reload)
                                        toast.success("Order placed successfully.",{theme: 'dark'})
                                    }
                                }
                            })
                        }
                    }
                }).catch(e=>{
                    console.log(e);
                })
            }
        }else{
            toast.error("Please add something in your cart.",{theme: 'dark'})
        }

        setLoading(false)
    }

    useEffect(()=>{
        loadItems()
    },[reload])

    useEffect(()=>{
        loadAddress()
    },[])

    return (
        <>
        <Header location='cart' />
        <div className="cart__wrapper">
            <div className="orders__container cart__container">
            <header className="sectionHeader ordersHeader">
                <p className="orders__title">My Cart</p>
                </header>
            <div className="orders__all cart__all" style={products.length == 0 ? {gridTemplateColumns: "1fr"} : {}}>
                {
                    products.length > 0 ? (
                        products.map((product,index)=>(
                            <>
                            <Item key={index} location='cart' refresh={reload} setRefresh={setReload} product={product} />
                            </>
                        ))
                    ) : (<h1 className='nothingFound'>No items found.</h1>)
                }
            </div>
            </div>
            <div className="sideCheckoutSection">
                <p className="cart__payment__title">Payment</p>
                <div className="cart__select__method">
                    <span className='cart__options__container'>
                    <input type="radio" name="method" value='COD' id="cod" className='cart__options__radio' onClick={handleClick} />
                    <label htmlFor="cod" className='options__label'>Cash on Delivery</label>
                    </span>
                    <span className='cart__options__container'>
                    <input type="radio" name="method" id="card" value='CARD' className='cart__options__radio' onClick={handleClick} disabled />
                    <label htmlFor="card" className='options__label'>Credit/Debit card</label>
                    </span>
                    <span className='cart__options__container'>
                    <input type="radio" name="method" id="gpay" value='GPAY' className='cart__options__radio' onClick={handleClick} disabled />
                    <label htmlFor="gpay" className='options__label'>Google Pay</label>
                    </span>
                </div>
                <p className="cart__payment__title cart__address__title">Address</p>
                <div className='cart__previewAddress' >
                    {
                        userAddress && (
                            <>
                                <h4 className='cart__address__text'>{userAddress.name}</h4>
                                <h5 className='cart__address__text cart__address__subText'>{userAddress.contact} , {userAddress.landmark}</h5>
                                <h5 className='cart__address__text cart__address__subText'>{userAddress.line1}</h5>
                                <h5 className='cart__address__text cart__address__subText'>{userAddress.city} , {userAddress.pincode} , {userAddress.state}</h5>
                            </>
                        )
                    }
                </div>
                <div className='cart__totals'>
                    <p className="cart__totalItems">Items: {products.length}</p>
                    <p className="cart__totalPrice">Price: {totalPrice}</p>       
                </div>
                <button type='submit' className="cart__buyNow" onClick={handleSubmit} disabled={loading}>
                    {
                        loading ? (<img src={loader} className="cart__payment__loading" />) : ('Buy')
                    }
                </button>

            </div>
        </div>
        <Footer />
        {
            error && (toast.error("Faild to load items from cart"))
        }
        </>
    )
}

export default Cart