import React from 'react';
import {ImWarning} from 'react-icons/all'
import { toast } from 'react-toastify';
import { deleteProductAdmin } from '../Admin/helper/adminApiCalls';
import { deleteProductDev } from '../Developer/helper/developerApiCalls';
import { deleteProductSeller } from './helper/sellerApiCalls';

const ConfirmDeletion = ({refresh = undefined,setRefresh=f=>f,setWarning=f=>f,productId,user,token,productName}) => {

    const handleDelete = e => {
        if(user.role >= 5){
            deleteProductDev(user._id,token,productId).then(data=> {
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: "dark"})
                    }else{
                        toast.success("Product removed.",{theme: "dark"})
                        setRefresh(!refresh)
                        setWarning(false)
                    }
                }
            })
        }else if(user.role === 2){
            deleteProductAdmin(user._id,token,productId).then(data=> {
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: "dark"})
                    }else{
                        toast.success("Product removed.",{theme: "dark"})
                        setRefresh(!refresh)
                        setWarning(false)
                    }
                }
            })
        }else if(user.role === 1){
            deleteProductSeller(user._id,token,productId).then(data=> {
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: "dark"})
                    }else{
                        toast.success("Product removed.",{theme: "dark"})
                        setRefresh(!refresh)
                        setWarning(false)
                    }
                }
            })
        }
    }

  return (
      <div className="myProducts__confirmation__container">
        <div className="myProducts__delete__card">
          <div className="myProducts__delete__warning">
              <div className="myProducts__delete__header">
                  <i className='myProducts__warning__icon'><ImWarning /></i>
                  <h2 className="myProducts__delete__msg">Warning</h2>
              </div>
              <div className="myProducts__delete__body">
                  <h4 className="myProducts__delete__text">Are you sure you want to remove -</h4>
                  <h4 className="myProducts__delete__name">{productName}</h4>
              </div>
          </div>
          <div className="myProducts__delete__btns">
            <button className="myProducts__delete__agree" onClick={handleDelete}>Delete</button>
            <button className="myProducts__delete__disagree" onClick={e=>setWarning(false)}>Cancel</button>
          </div>
        </div>
      </div>
  );
};

export default ConfirmDeletion;
