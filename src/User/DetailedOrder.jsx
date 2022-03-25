import React,{useEffect,useState} from 'react'
import { useParams } from "react-router";
import { toast } from 'react-toastify';
import {getOrderById} from './helper/userApiCalls'
import {isAuthenticated} from '../Auth/helper/authApiCalls'
import { getProductPhotos, getSingleProductPhoto } from '../Core/helper/coreApiCalls';


function DetailedOrder() {
    const {orderId} = useParams()
    const [order,setOrder] = useState(undefined)
    const [photos,setPhotos] = useState([])
    const {user,token} = isAuthenticated()

    const preload = ()=>{
        getOrderById(orderId,user._id,token).then(data=>{
            if(data){
                if(data.error){
                    toast.error(data.error,{theme: 'dark'})
                    console.log(data.message)
                }else{
                    setOrder(data)
                    console.log(data);
                }
            }
        }).catch(e=> toast.error(e,{theme: 'dark'}))
    }

    const loadPhotos = () =>{
        if(order){
            order.products.map(product=>{
                getProductPhotos(product.product._id).then(data=>{
                    if(data){
                        if(data.error){
                            toast.error(data.error,{theme: 'dark'})
                        }else{
                            setPhotos([...photos,data[0]])
                            console.log(data)
                        }
                    }
                })
            })
        }
    }

    useEffect(()=>{
        preload()
    },[])
    useEffect(()=>{
        loadPhotos()
    },[order])
    return (
    <div className="orders__container order__detailed__container">
        <header className="sectionHeader ordersHeader">
            <p className="orders__title">Order info</p>
        </header>
        <div className="order__parts">
            <div className="order__left">
                {
                   order && order.products.map((product,index)=>(
                        <div className="order__item" key={index}>
                            <div className="order__item__image">
                                {
                                    photos.length > 0 ? (
                                        <img src={photos[index]} alt={product.name} className="order__item__image__actual" />
                                    ) : ('')
                                }
                            </div>
                            <div className="order__item__info">
                                <div className="order__item__name"></div>
                                <div className="order__item__price"></div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="order__right"></div>
        </div>

    </div>
    )
}

export default DetailedOrder
