import React,{useState,useEffect} from 'react';
import {toast} from 'react-toastify'
import {getAllCategories} from '../Core/helper/coreApiCalls'
import {CgClose} from 'react-icons/all'
import { isAuthenticated } from '../Auth/helper/authApiCalls';
import { createProductDev, editProductDev } from '../Developer/helper/developerApiCalls';
import {createProduct} from './helper/sellerApiCalls'

const CreateProductForm = ({userId,setOpenAction=f=>f,option = "create",loadedProd = undefined}) => {

  const [inputs,setInputs] = useState({
    name: "",
    description: "",
    price: 0,
    stock: "",
    category: "",
    photos: [],
    seller: '',
    loadImages: true,
    isLoading: false,
    formData: new FormData()
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
          setInputs({...inputs,formData: new FormData()})
        }
      }
    })
  },[])

  useEffect(()=>{
    let images = photos
    images.map(img => {
      let urls = productPhotos
      let url = URL.createObjectURL(img)
      urls.push(url)
      setProductPhotos(urls)
     })
  },[photos])

  const clearPhotos = () => {
    setProductPhotos([])
    setInputs({...inputs,loadImages: true})
  }

  const handleChange = name => e => {
    const value = name === "photos" ? Array.from(e.target.files) : e.target.value

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

  const handleBeforeSubmit = e => {
    e.preventDefault()
    formData.append("seller",user._id)
    setInputs({...inputs,seller: user._id,isLoading:true})
    handleSubmit(e)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setInputs({...inputs,isLoading: true})

    if(user.role === 5){
        createProductDev(user._id,token,formData).then(data=>{
        if(data){
          if(data.error){
            toast.error(data.error,{theme: "dark"})
            setInputs({...inputs,isLoading: false})
          }else{
            toast.success("Product added.",{theme: "dark"})
            setInputs({
              ...inputs,
              name: "",
              description: "",
              price: 0,
              stock: "",
              category: "",
              photos: [],
              seller: '',
              loadImages: true,
              formData: new FormData(),
              isLoading: false
            })
            setProductPhotos([])
          }
        }
      }).catch(e=>{
        console.log(e)
      })

    }else{
      console.log("INSIDE PRODUCT SELLER!");
      createProduct(user._id,token,formData).then(data=>{
        if(data){
          if(data.error){
            toast.error(data.error,{theme: "dark"})
          }else{
            toast.success("Product added.",{theme: "dark"})
            setInputs({
              ...inputs,
              name: "",
              description: "",
              price: 0,
              stock: "",
              category: "",
              photos: [],
              seller: '',
              loadImages: true,
              formData: new FormData(),
              isLoading: false
            })
            setProductPhotos([])
          }
        }
      }).catch(e=>{
        console.log(e)
      })
    }

    // setInputs({...inputs,isLoading: false})
  }

  return (
      <div className="productForm__container">
        <div className="product__form__header">
          <h2 className="product__form__title">Create Product</h2>
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
          
          {
            option !== 'update' && (
              <>
                <label htmlFor="category" className="product__label">Category</label>
                
                <select value={category} onChange={e=>handleChange("category")(e)} disabled={categories.length > 0 ? (false) : (true)} name="category" className="product__input product__categoryHolder">
                  <option value={categories.length > 0 && categories[0]._id} className="product__category">Select Category</option>
                  {
                    categories.length > 0 ? (
                      categories.map((cate,index)=>(
                        <option key={index} value={cate._id} className="product__category">{cate.name}</option>
                      ))
                    ) : ('Loading')
                  }
                </select>
                  <label htmlFor="photos" className="product__label">Images</label>
                  <input type="file" accept='image' name="photos" onClick={clearPhotos} onChange={e=>handleChange("photos")(e)} className="product__input" multiple />
                  <div className="product__images__display">
                    {
                      productPhotos.length > 0 ? (
                        productPhotos.map((image,index)=>(
                          <img src={image} alt="preview" className="product__image__display__item" key={index} />
                        ))
                      ) : ""
                    }
                  </div>
                  {
                    loadImages && (
                      <h3 className="image__loader__trigger" onClick={e=>setInputs({...inputs,loadImages: false})}>Load selected images</h3>
                    )
                  }
              </>
            )
          }
          <button onClick={handleBeforeSubmit} type='submit' className="product__form__submit">{isLoading ? ("Adding...") : ('Add Product')}</button>
        </form>
        {
          isLoading && (<div className='blurredCover'></div>)
        }
      </div>
  );
};

export default CreateProductForm;
