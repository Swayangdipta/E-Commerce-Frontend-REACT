import React,{useEffect, useState} from 'react'
import { getProductPhotos, getSingleProductPhoto } from './helper/coreApiCalls'
import {AiFillTag,FaRupeeSign,FaInfoCircle} from 'react-icons/all'
import loader from '../assets/image/Ripple-1s-200px.svg'
import ViewItem from './ViewItem'

export default function Results({
    result,
    isSearchOpen=undefined,
    setIsSearchOpen= f=>f
}) {
    const [image,setImage] = useState(undefined)
    const [viewProduct,setViewProduct] = useState(false)

    const preload = () => {
        getSingleProductPhoto(result.photos[0]._id,result._id).then(data => {
            if(data.error){
                console.log(data.error)   
            }else{
                setImage(data.url)
            }
        })
    }
    
    useEffect(()=>{
        preload()
    },[])

    const handleClick = e => {
        setViewProduct(true)
    }
    
    return (
            <div className ="resultContainer" onClick={handleClick}>
            {image != undefined ? (
                <div className="resultImage"><img src={image} className="actual_image" /></div>
            ) : (<div className="resultImage"><img src={loader} className="actual_image" /></div>)}

            <div className = "resultInfo">
                <h1 className="resultName">{result.name}</h1>
                <span className="resultDescription"> 
                    {result.category ? (<p className="resultCategory"><AiFillTag style={{paddingTop: '2px'}} />&nbsp;{result.category.name}</p>)
                    :<p className="resultCategory"><FaInfoCircle style={{paddingTop: '2px'}} />&nbsp;{result.description}</p> }
                    {result.price && (<h1 className="resultPrice">
                        <FaRupeeSign/> {result.price}
                    </h1>)}
                </span>

            </div>
            {
                viewProduct && (<ViewItem product={result} setOpenActive={setIsSearchOpen} openActive={isSearchOpen} photo={image} />)
            }
        </div>
    )
}
