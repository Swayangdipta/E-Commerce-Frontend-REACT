import React, { useEffect, useState } from 'react';
import {CgClose} from 'react-icons/all'
import { toast } from 'react-toastify';
import { createCategoryAdmin, updateCategoryAdmin } from '../Admin/helper/adminApiCalls';
import { isAuthenticated } from '../Auth/helper/authApiCalls';
import { createCategoryDev, updateCategoryDev } from '../Developer/helper/developerApiCalls';


const CreateCategory = ({setOpenAction=f=>f,loc="create",fetchedCate=undefined}) => {

    const [name,setName] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const {user,token} = isAuthenticated()

    const handleSubmit = event => {
        event.preventDefault()
        setIsLoading(true)
        if(user.role === 5){
            createCategoryDev(name,user._id,token).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme:"dark"})
                    }else{
                        toast.success("Category created.",{theme: "dark"})
                        setName('')
                    }
                }
            })
        }else{
            createCategoryAdmin(name,user._id,token).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme:"dark"})
                    }else{
                        toast.success("Category created.",{theme: "dark"})
                        setName('')
                    }
                }
            })
        }

        setIsLoading(false)
    }

    const handleUpdate = event => {
        event.preventDefault()
        setIsLoading(true)
        if(user.role === 5){
            updateCategoryDev(user._id,fetchedCate._id,name,token).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme:"dark"})
                    }else{
                        toast.success("Category updated.",{theme: "dark"})
                    }
                }
            })
        }else{
            updateCategoryAdmin(user._id,fetchedCate._id,name,token).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme:"dark"})
                    }else{
                        toast.success("Category updated.",{theme: "dark"})
                    }
                }
            })
        }
        setIsLoading(false)
    }

    useEffect(()=>{
        if(loc==="update"){
            setName(fetchedCate.name)
        }
    },[])

  return (
      <div className="productForm__container category__container">
        <div className="product__form__header">
          <h2 className="product__form__title">Create Category</h2>
          <i className="product__form__close" onClick={e=>setOpenAction(false)}><CgClose /></i>
        </div>

        <form className="productForm" encType="multipart/form-data">

            <label htmlFor="name" className="product__label">Name</label>
            <input type="text" value={name} onChange={e=>setName(e.target.value)} name="name" className="product__input" placeholder='Category name...' />

            {
                loc === "create" ? (
                    <button onClick={handleSubmit} type='submit' className="product__form__submit">{isLoading ? ("Creating...") : ('Create')}</button>
                ) : (
                    <button onClick={handleUpdate} type='submit' className="product__form__submit">{isLoading ? ("Updating...") : ('Update')}</button>
                )
            }            
        </form>
      </div>
  )
};

export default CreateCategory;
