import React,{useState,useEffect} from 'react'
import { toast } from 'react-toastify'
import { getAllCategories } from '../Core/helper/coreApiCalls'
import {CgClose} from 'react-icons/cg'
import {ImBin2} from 'react-icons/im'
import {AiFillEdit} from 'react-icons/ai'
import { deleteCategoryDev } from '../Developer/helper/developerApiCalls'
import { deleteCategoryAdmin } from './helper/adminApiCalls'
import CreateCategory from '../Seller/CreateCategory'

const ManageCategories = ({setOpenAction=f=>f,user,token}) => {
    const [categories,setCategories] = useState([])
    const [refresh,setRefresh] = useState(false)
    const [isEditOpen,setIsEditOpen] = useState(false)
    const [toBeEdited,setToBeEdited] = useState({})

    const preload = () => {
        getAllCategories().then(data=>{
            if(data){
                if(data.error){
                    toast.error(data.error,{theme: "dark"})
                }else{
                    setCategories(data)
                }
            }
        })
    }

    useEffect(()=>{
        preload()
    },[refresh,isEditOpen])

    const handleEdit = cate => {
        setToBeEdited(cate)
        setIsEditOpen(true)
    }
    const handleDelete = cate => {

        const cateId = {
            _id: cate
        }

        if(user.role === 5){
            deleteCategoryDev(user._id,cateId,token).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: "dark"})
                    }else{
                        toast.success("Category deleted.",{theme: "dark"})
                        setRefresh(!refresh)
                    }
                }
            })
        }else if(user.role === 2){
            deleteCategoryAdmin(user._id,cate,token).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: "dark"})
                    }else{
                        toast.success("Category deleted.",{theme: "dark"})
                        setRefresh(!refresh)
                    }
                }
            })
        }else{
            return toast.error("You don't have authorization to modify this!",{theme: "dark"})
        }

    }

  return (
    <div className="productForm__container myProducts__container">
    <div className="product__form__header myProducts__header">
      <h2 className="product__form__title">Manage Categories</h2>
      <i className="product__form__close" onClick={e=>setOpenAction(false)}><CgClose /></i>
    </div>
    <div className="myProducts__body">
        {
            categories.length > 0 && (
                categories.map((category,index)=>(
                    <React.Fragment key={index}>
                        <div className="myProducts__item" key={index}>
                            <div className="myProducts__item__info">
                                <h3 className="myProducts__item__name" style={{
                                    fontSize: "14px"
                                }}>{category.createdAt}</h3>
                            </div>
                            <div className="myProducts__item__info">
                                <h3 className="myProducts__item__name">{category.name}</h3>
                            </div>
                            <div className="myProducts__item__manage">
                                <div className="myProducts__item__edit" onClick={e=>handleDelete(category._id)}><ImBin2 /></div>
                                <div className="myProducts__item__edit myProducts__item__delete"  onClick={e=>handleEdit(category)}><AiFillEdit /></div>
                            </div>
                        </div>
                    </React.Fragment>
                ))
            )
        }
    </div>
        {
            isEditOpen && (
                <CreateCategory setOpenAction={setIsEditOpen} loc="update" fetchedCate={toBeEdited} />
            )
        }
    </div>
  )
}

export default ManageCategories