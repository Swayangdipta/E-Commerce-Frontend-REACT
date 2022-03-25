import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import {getAllProductsByCategory} from './helper/coreApiCalls'
import Header from './Header'
import Footer from './Footer'
import Item from './Item'
import { toast } from 'react-toastify'

const ProductsByCategory = () => {
    const {categoryId} = useParams()
    const [products,setProducts] = useState([])

    useEffect(() => {
      toast.info("Loading...",{theme: 'dark'})
      getAllProductsByCategory(categoryId).then(data=>{
        if(data){
          if(data.error){
            toast.error(data.error,{theme: 'dark'})
          }else{
            setProducts(data)
          }
        }
      })
    }, [categoryId])
    
  return (
    <>
    <Header/>

      <h2 className="productsByCategory__title">All Products &gt; {products.length > 0 ? (products[0].category.name):(".....")}</h2>

      <div className="productsByCategory__wrapper">
        {
          products.length > 0 && products.map((product,index)=>(
            <Item product={product} key={index} />
          ))
        }
      </div>

    <Footer />
    </>
  )
}

export default ProductsByCategory