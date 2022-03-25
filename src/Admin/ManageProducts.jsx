import React,{useState,useEffect} from 'react'
import {CgClose} from 'react-icons/cg'
import {ImBin2} from 'react-icons/im'
import {AiFillEdit} from 'react-icons/ai'
import { toast } from 'react-toastify'
import { getAllProducts, searchProduct } from '../Core/helper/coreApiCalls'
import ConfirmDeletion from '../Seller/ConfirmDeletion'
import EditProduct from '../Seller/EditProduct'
import { isAuthenticated } from '../Auth/helper/authApiCalls'

const API = process.env.REACT_APP_BACKEND


const ManageProducts = ({setOpenAction=f=>f}) => {

  const [products,setProducts] = useState([])
  const [search,setSearch] = useState({
    query: "",
    results: []
  })

  const [refresh,setRefresh] = useState(false)
  const [isConfirmed,setIsConfirmed] = useState(false)
  const [itemToWork,setItemToWork] = useState(false)
  const [editThis,setEditThis] = useState({})
  const {user,token} = isAuthenticated()
    

  const preload = () => {
    getAllProducts().then(data=>{
      if(data){
        if(data.error){
          toast.error("Faild to load products.Try again later!",{theme: "dark"})
        }else{
          setProducts(data)
        }
      }
    })
  }


  useEffect(()=>{
    preload()
  },[refresh])

  const handleDelete = prod => {
    setItemToWork({
      name: prod.name,
      _id: prod._id
    })
    setIsConfirmed("delete")
  }

  const handleEdit = product => {
    setEditThis(product)
    setIsConfirmed("edit")
  }

  const handleSearch = e =>{
    e.preventDefault()
    setSearch({...search,query: e.target.value})
    searchProduct(e.target.value).then(data=>{
      if(data){
        if(data.error){
          toast.error(data.error,{theme: 'dark'})
          setSearch({...search,query: "",results: []})
        }else{
          setSearch({...search,results: data})
        }
      }
    })
  }
 
  const allProducts = () => (
      products && products.length > 0 ? products.map((product,index)=>(
        // console.log(product.seller.name)
      <div className="myProducts__item" key={index}>
          <div className="myProducts__image__holder">
              <img src={`${API}/product/single/photo/${product._id}?photo=${product.photos[0]._id}`} alt="" className="myProducts__item__image" />
          </div>
          <div className="myProducts__item__info">
              <h3 className="myProducts__item__name">{product.name}</h3>
              <h4 className="myProducts__item__price">{product.price} | {product.category ? product.category.name : ''} |{product.seller ? product.seller.name : ''}</h4>
          </div>
          <div className="myProducts__item__manage">
              <div className="myProducts__item__edit" onClick={e=>handleDelete(product)}><ImBin2 /></div>
              <div className="myProducts__item__edit myProducts__item__delete"  onClick={e=>handleEdit(product)}><AiFillEdit /></div>
          </div>
      </div>
      )) : (<div className="no__products">No Products.</div>)
  )

  const searchResults = () => (
    search.results.length > 0 ? (
      search.results.map((product,index)=>(
        <div className="myProducts__item" key={index}>
            <div className="myProducts__image__holder">
                <img src={`${API}/product/single/photo/${product._id}?photo=${product.photos[0]._id}`} alt="" className="myProducts__item__image" />
            </div>
            <div className="myProducts__item__info">
                <h3 className="myProducts__item__name">{product.name}</h3>
                <h4 className="myProducts__item__price">{product.price} | {product.category?product.category.name : ""} | {product.seller? product.seller.name:''}</h4>
            </div>
            <div className="myProducts__item__manage">
                <div className="myProducts__item__edit" onClick={e=>handleDelete(product)}><ImBin2 /></div>
                <div className="myProducts__item__edit myProducts__item__delete"  onClick={e=>handleEdit(product)}><AiFillEdit /></div>
            </div>
        </div>
      ))
    ) : (<div className='no__products'>No products found.</div>)
  )

  const getSortedProducts = method => {
    if(method === "priceH2L"){
      return products.sort(function(a,b){
        return b.price - a.price;
      })
    }else if(method === "priceL2H"){
      return products.sort(function(a,b){
        return a.price - b.price;
      })
    }else{
      return products.sort(function(a,b){
        return b.sold - a.sold;
      })
    }
  }
  
  const getSortedSearches = method =>{
    if(method === "priceH2L"){
      return search.results.sort(function(a,b){
        return b.price - a.price;
      })
    }else if(method === "priceL2H"){
      return search.results.sort(function(a,b){
        return a.price - b.price;
      })
    }else{
      return search.results.sort(function(a,b){
        return b.sold - a.sold;
      })
    }
  }


  const sortProducts = method => {
    if(search.results.length > 0){
      let sortedProducts = getSortedSearches(method)
      setSearch({...search,results:sortedProducts})
    }else{
      let sortedProducts = getSortedProducts(method)
      setProducts(oldArray=>[...sortedProducts])
    }

  }

  return (
    <div className="productForm__container myProducts__container">
    <div className="product__form__header myProducts__header">
      <h2 className="product__form__title">Manage Products</h2>
      <i className="product__form__close" onClick={e=>setOpenAction(false)}><CgClose /></i>
    </div>

    <div className="display__search__options">
        <div className="search__bar__container">
            <form action="" className="search__product__form">
                <input type="search" name="search" className='search__product' placeholder='Search Product...' onChange={handleSearch} />
            </form>
        </div>

        <div className="filter__holder">
            <h4 className="filter__title">Sort: </h4>
            <select className='filter__sort' onChange={e=>sortProducts(e.target.value)}>
                <option value="priceH2L" className='filter__options'>Price- High to low</option>
                <option value="priceL2H" className='filter__options'>Price- Low to high</option>
                <option value="sells" className='filter__options'>Sells</option>
            </select>
        </div>
    </div>

    <div className="myProducts__body">
      {
        search.results.length > 0 ? (searchResults()) : (allProducts())
      }
    </div>
      {
        isConfirmed === "delete" ? (<ConfirmDeletion
            refresh={refresh}
            setRefresh={setRefresh}
            setWarning={setIsConfirmed}
            user={user}
            token={token}
            productId={itemToWork._id}
            productName= {itemToWork.name}
           />) : isConfirmed === "edit" ? (
             <EditProduct refresh={refresh} setRefresh={setRefresh} setOpenAction={setIsConfirmed} prod={editThis} />
           ) : ''
      }
    </div>
  )
}

export default ManageProducts