import React,{useState,useEffect} from 'react'
import {FaArrowLeft,FaPlusSquare,FaMinusSquare,IoCaretBack,IoCaretForward} from 'react-icons/all'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addItemToCart } from '../User/helper/userUtility'
import { getSingleProductPhoto } from './helper/coreApiCalls'
import OrderPage from './OrderPage'

function ViewItem({
    product,
    setOpenActive = f=> f,
    openActive = undefined,
    photo,
    location = 'home',
    closeBg=undefined,
    setCloseBg=f=>f
}) {

    const [count,setCount] = useState(1)
    const [products,setProducts] = useState([])
    const [images,setImages] = useState([])
    const [isImagesLoaded,setIsImagesLoaded] = useState(false)
    const [image,setImage] = useState(photo)
    const [position,setPosition] = useState(0)
    const [error,setError] = useState(false)
    const [redirect,setRedirect] = useState(false)
    const [btnColor,setBtnColor] = useState({
        outOfRange: '#5c5c5c',
        minus: "#e91e2f",
        plus: "rgb(49 255 65)"
    })

    const [openOrderPage,setOpenOrderPage] = useState(false)

    const preloadImages = (next) => {
        product.photos.map(photo => {
            getSingleProductPhoto(photo._id,product._id).then(data=>{
                if(data){
                    if(data.error){
                        setError(data.error)
                    }else{
                        // let urlArray = images
                        // urlArray.push(data.url)
                        setImages(oldArray => [...oldArray,data.url])
                    }
                }
            })
        })
        next()
    }

    useEffect(()=>{
        preloadImages(()=>{
            setTimeout(()=>{
                setIsImagesLoaded(true)
            },200)
        })
        
    },[])

    useEffect(() => {
        setImage(photo)
        setProducts([...products,product])
        if(product.stock < 1){
            setCount(0)
        }
    }, [])

    const handleChange = direction => {
        if(direction == "prev"){
            if(position > 0) {
                setImage(images[position-1])
                setPosition(position-1)
            }
        }else{
            if(position < images.length - 1){
                setImage(images[position+1])
                setPosition(position+1)
            }
        }
    }

    const changeImageOnClick = pos => {
        setImage(images[pos])
        setPosition(pos)
    }

    const addItemIntoCart = () => {
        if(product.stock > 0 && count > 0){
            addItemToCart(product,count,()=>{
                setRedirect(true)
            })      
        }
    }


    return (
        <>
        <div className="backgroundBlur">
            {
                redirect && (<Redirect to="/cart" />)
            }
            <div className="orders__container viewItem__container">
                <header className="sectionHeader ordersHeader">
                <i className="orders__goback" onClick={()=>{
                        setOpenActive(false)
                        setCloseBg(false)
                    }}><FaArrowLeft /></i>
                <p className="orders__title">Specifications</p>
                </header>

                <div className="viewItem__separator">
                    <div className="viewItem__imageAndQuantity">
                        <div className='changePictures'>
                            <span className='previousImage' onClick={()=>handleChange("prev")}><IoCaretBack /></span>
                            <span className='nextImage' onClick={()=>handleChange("next")}><IoCaretForward /></span>
                        </div>
                        <img src={image} className="viewItem__image" alt={product.name} />
                        <div className='viewItem__all__images'>
                            {
                                isImagesLoaded && images.map((img,index)=>(
                                    <img src={img} key={index} onClick={()=>changeImageOnClick(index)} className='viewItem__small__thumbnails' />
                                ))
                            }
                        </div>
                        <div className="viewItem__itemNameAndOthers">
                            <h4 className="viewItem__name">{product.name}</h4>
                            <span className="viewItem__quantity">
                                <FaMinusSquare className='viewItem__quantity__btn' style={{color: count == 0 ? btnColor.outOfRange : btnColor.minus}}  onClick={e=>{
                                    if(count > 0){
                                        setCount(count-1)
                                    }
                                }} />
                                <p className="viewItem__totalItems">{count}</p>
                                <FaPlusSquare className='viewItem__quantity__btn' style={{color: count == product.stock ? btnColor.outOfRange : btnColor.plus}}  onClick={e=>{
                                    if(count < product.stock){
                                        setCount(count+1)
                                    }
                                }} />
                            </span>
                        </div>

                    </div>
                    <div className="viewItem__info">
                        <h4 className="viewItem__name viewItem__name__full" style={{whiteSpace: "break-spaces"}}>{product.name}</h4>
                        <h4 className="viewItem__price viewItem__description__title">Price</h4>
                        <h4 className="viewItem__price viewItem__price__value">Rs. {product.price} /-</h4>
                        <h4 className="viewItem__category viewItem__description__title">Category</h4>
                        <h4 className="viewItem__category viewItem__price__value">{product.category.name}</h4>
                        <h4 className="viewItem__description__title">Description</h4>
                        <p className="viewItem__description">{product.description}</p>
                        <h4 className="viewItem__total">By - {product.seller && product.seller.name ? product.seller.name : "----" } </h4>
                        <div className="viewItem__container__btn">
                            <button className="viewItem__btn redirectToOrder" onClick={e=>setOpenOrderPage(true)} disabled={count == 0 ? true : false} style={{
                                cursor: count==0 ? 'not-allowed':'pointer'
                            }}>{ product.stock > 1 ? (`Buy Rs.${(product.price * count).toFixed(2)}`) : ("Out of stock")}</button>
                            {
                                location !== 'cart' && product.stock > 0 && count > 0 ? (<button className="viewItem__btn addItemToCart" disabled={product.stock == 0 ? true : false} onClick={addItemIntoCart}>Add to Cart</button>) : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {
            openOrderPage && (<OrderPage products={products} count={count} />)
        }
        {
            error && (toast.error("Something went wrong!"))
        }
        </>
    )
}

export default ViewItem