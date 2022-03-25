import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { isAuthenticated } from '../Auth/helper/authApiCalls';
import { getUser } from '../User/helper/userApiCalls';
import {CgClose,ImBin2,AiFillEdit} from 'react-icons/all'
import { getSingleProduct } from '../Core/helper/coreApiCalls';
import ViewItem from '../Core/ViewItem'
import ConfirmDeletion from './ConfirmDeletion';
import EditProduct from './EditProduct';
import CreateProductForm from './CreateProductForm';


const API = process.env.REACT_APP_BACKEND 

const MyProducts = ({loc = "myProducts",setOpenAction=f=>f}) => {
    const [products,setProducts] = useState([])
    const [productIds,setProductIds] = useState([])
    const [openActive,setOpenActive] = useState(false)
    const [itemToOpen,setItemToOpen] = useState(false) 
    const [refresh,setRefresh] = useState(false)

    const {user,token} = isAuthenticated()

    const preload = () => {
        if(loc === "myProducts"){
            setProducts([])
            getUser(user._id).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: 'dark'})
                    }else{
                        setProductIds(data.products)
                        if(data.products){
                            if(data.products.length > 0){
                                data.products.forEach(id=>{
                                    getSingleProduct(id).then(datap=>{
                                        if(datap){
                                            if(datap.error){
                                                toast.error(datap.error,{theme: 'dark'})
                                            }else{
                                                setProducts(oldArray => [...oldArray,datap])
                                            }
                                        }
                                    }).catch(e=>console.log(e))
                                })
                            }
                        }

                    }
                }
            })
        }else{

        }
    }

    useEffect(()=>{
        preload()
    },[refresh])

    const handleView = prod => {
        setItemToOpen(prod)
        setOpenActive("view")
    }

    const handleDelete = prod => {
        setItemToOpen({
            name: prod.name,
            _id: prod._id
        })
        setOpenActive("warning")
    }

    const handleEdit = prod => {
        setItemToOpen(prod)
        setOpenActive("edit")
    }


  return (
      <div className="productForm__container myProducts__container">
        <div className="product__form__header myProducts__header">
          <h2 className="product__form__title">My Products</h2>
          <i className="product__form__close" onClick={e=>setOpenAction(false)}><CgClose /></i>
        </div>
        <div className="myProducts__body">
            {
                products.length ? (products.map((product,index)=>(
                    <React.Fragment key={index}>
                    <div className="myProducts__item" key={index}>
                        <div className="myProducts__image__holder" onClick={e=>handleView(product)}>
                            <img src={`${API}/product/single/photo/${product._id}?photo=${product.photos[0]._id}`} alt="" className="myProducts__item__image" />
                        </div>
                        <div className="myProducts__item__info" onClick={e=>handleView(product)}>
                            <h3 className="myProducts__item__name">{product.name}</h3>
                            <h4 className="myProducts__item__price">Rs. {product.price}</h4>
                        </div>
                        <div className="myProducts__item__manage">
                            <div className="myProducts__item__edit" onClick={e=>handleDelete(product)}><ImBin2 /></div>
                            <div className="myProducts__item__edit myProducts__item__delete"  onClick={e=>handleEdit(product)}><AiFillEdit /></div>
                        </div>
                    </div>
                    </React.Fragment>
                ))) : ''
            }
        </div>
        {
            openActive === "view" && itemToOpen && (<ViewItem product={itemToOpen} setOpenActive={setOpenActive} />)
        }
        {
            openActive === "warning" && itemToOpen && (<ConfirmDeletion productName={itemToOpen.name} productId={itemToOpen._id} user={user} token={token} setWarning={setOpenActive} refresh={refresh} setRefresh={setRefresh} />)
        }
        {
            openActive === "edit" && itemToOpen && (<EditProduct prod={itemToOpen} setOpenAction={setOpenActive}/>)
        }
      </div>
  );
};

export default MyProducts;
