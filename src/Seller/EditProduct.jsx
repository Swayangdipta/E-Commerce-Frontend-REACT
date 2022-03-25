import React,{useState,useEffect} from 'react';
import {toast} from 'react-toastify'
import {getAllCategories} from '../Core/helper/coreApiCalls'
import {CgClose} from 'react-icons/all'
import { isAuthenticated } from '../Auth/helper/authApiCalls';
import {editProductDev} from '../Developer/helper/developerApiCalls';
import { editProductAdmin } from '../Admin/helper/adminApiCalls';
import { editProductSeller } from './helper/sellerApiCalls';


const CreateProductForm = ({setOpenAction=f=>f,prod = undefined,refresh=undefined,setRefresh=f=>f}) => {

  const [inputs,setInputs] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    photos: [],
    seller: "",
    loadImages: true,
    isLoading: false,
    formData: ""
  })

  const {token,user} = isAuthenticated()


  const [productPhotos,setProductPhotos] = useState([])

  const {name,description,photos,price,isLoading,seller,stock,category,formData,loadImages} = inputs

  const [categories,setCategories] = useState([])

  useEffect(()=>{
    getAllCategories().then(data=>{
      if(data){
        if(data.error){
          toast.error("Please retry.Faild to load categories",{theme: "dark"})
        }else{
          setCategories(data)
          setInputs({
            ...inputs,
            name: prod.name,
            description: prod.description,
            price: prod.price,
            stock: prod.stock,
            category: prod.category._id,
            photos: [],
            seller: prod.seller._id,
            loadImages: true,
            isLoading: false,
            formData: new FormData()
          })
        }
      }
    })
  },[])

  const handleChange = name => event => {
    let value = name === "photos" ? Array.from(event.target.files) : event.target.value

    if(name === "photos"){
      console.log("This is photos.");
      console.log(value);
      value.map(i=>{
        formData.append(name,i)
      })
      setInputs({...inputs,[name]: value})
    }else{
      formData.append(name,value)
      setInputs({...inputs,[name]: value})
    }

  }

  const handleBeforeSubmit = event => {
      event.preventDefault()
      setInputs({...inputs,isLoading: true})
      if(user.role === 5) {

        editProductDev(formData,prod._id,user._id,token).then(data=>{
          if(data){
            if(data.error){
              toast.error(data.error,{theme: "dark"})
              console.log(data.error);
            }else{
              toast.success("Product updated.",{theme: "dark"})
              setRefresh(!refresh)
              setInputs({
                ...inputs,
                name: data.name,
                description: data.description,
                price: data.price,
                stock: data.stock,
                category: data.category._id,
                photos: [],
                seller: data.seller._id,
                loadImages: true,
                isLoading: false,
                formData: new FormData()
              })
            }
          }
        })

      }else if(user.role === 2){
        editProductAdmin(formData,prod._id,user._id,token).then(data=>{
          if(data){
            if(data.error){
              toast.error(data.error,{theme: "dark"})
            }else{
              toast.success("Product updated.",{theme: "dark"})
              setRefresh(!refresh)
              setInputs({
                ...inputs,
                name: data.name,
                description: data.description,
                price: data.price,
                stock: data.stock,
                category: data.category._id,
                photos: [],
                seller: data.seller._id,
                loadImages: true,
                isLoading: false,
                formData: new FormData()
              })
            }
          }
        })
      }else if(user.role === 1){
        editProductSeller(formData,prod._id,user._id,token).then(data=>{
          if(data){
            if(data.error){
              toast.error(data.error,{theme: "dark"})
            }else{
              toast.success("Product updated.",{theme: "dark"})
              setRefresh(!refresh)
              setInputs({
                ...inputs,
                name: data.name,
                description: data.description,
                price: data.price,
                stock: data.stock,
                category: data.category._id,
                photos: [],
                seller: data.seller._id,
                loadImages: true,
                isLoading: false,
                formData: new FormData()
              })
            }
          }
        })
      }
      setInputs({...inputs,isLoading: false})
  }

  return (
    <div className="productForm__container">
      <div className="product__form__header">
        <h2 className="product__form__title">Update Product</h2>
        <i className="product__form__close" onClick={e=>setOpenAction(false)}><CgClose /></i>
      </div>

      <form className="productForm" encType="multipart/form-data">

        <label htmlFor="name" className="product__label">Name</label>
        <input type="text" value={name} onChange={e=>handleChange("name")(e)} name="name" className="product__input" placeholder='Product name...' />
        
        <label htmlFor="description" className="product__label">Description</label>
        <textarea cols="5" value={description} onChange={e=>handleChange("description")(e)}  name="description" className="product__input product__textarea" placeholder='Product description...' />
        
        <label htmlFor="price" className="product__label">Price</label>
        <input type="number" value={price} onChange={e=>handleChange("price")(e)} name="price" className="product__input" placeholder='Product price (INR)...' />
        
        <label htmlFor="stock" className="product__label">Stock</label>
        <input type="number" value={stock} onChange={e=>handleChange("stock")(e)} name="stock" className="product__input" placeholder='Product Stock...' />
        

        <button onClick={handleBeforeSubmit} type='submit' className="product__form__submit">{ isLoading ? ("Updating...") : ('Update Product') }</button>
      </form>
  </div>
  )
};

export default CreateProductForm;
