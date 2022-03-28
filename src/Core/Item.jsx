import React,{useState,useEffect} from 'react'
import { getSingleProductPhoto } from './helper/coreApiCalls'
// import {Link} from 'react-router-dom'
import ViewItem from './ViewItem'
import loader from '../assets/image/Ripple-1s-200px.svg'
import {ImBin2} from 'react-icons/all'
import { removeItemsFromCart, setOrderInLocalStorage } from '../User/helper/userUtility'

const API = process.env.REACT_APP_BACKEND 

function Item({
    location = "home",product,
    refresh = undefined,
    setRefresh = f=>f,
    openActive = undefined,
    setOpenActive= f=>f
}) {
    const [isItemOpen,setIsItemOpen] = useState(false)

    const deleteItemFromCart = () => {
        removeItemsFromCart(product._id)
        setRefresh(!refresh)
    }

    const handleBuy = e => {
        product.photos.map((photo)=>{
            photo.data = undefined
        })
        setOrderInLocalStorage(product)
    }

    return (
        <>
        <div className="item__container" onClick={e=>{
                        setIsItemOpen(true)
                        setOpenActive(!openActive)
                    }}>
            <img src={`${API}/product/single/photo/${product._id}?photo=${product.photos[0]._id}`} className="item__image" />) : (<img src={loader} className="item__image" />
            <span className="item__body">
                {
                    location == 'cart' ? (
                        <span className='removeItemFromCart' onClick={deleteItemFromCart}><ImBin2 /></span>
                    ) : ''
                }
                <h1 className="item__name">{product.name}</h1>
                <p className="item__price">Price: {product.price} RS.</p>
                {/* <div className="item__btn__container">
                    <Link to="/checkout" className="item__link">
                        <button className="item__btn__buyNow" onClick={handleBuy}>Buy</button>
                    </Link>
                    <button className="item__btn__view" onClick={e=>{
                        setIsItemOpen(true)
                    }}>View</button>
                </div> */}
            </span>
        </div>
        {
            isItemOpen && (<ViewItem closeBg={openActive} setCloseBg={setOpenActive} location={location} product={product} setOpenActive={setIsItemOpen} openActive={isItemOpen} photo={`${API}/product/single/photo/${product._id}?photo=${product.photos[0]._id}`} />)
        }
        </>
    )
}

export default Item