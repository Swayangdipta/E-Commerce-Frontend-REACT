const backend = process.env.REACT_APP_BACKEND

export const createProductDev = (userId,token,product) => {
    return fetch(`${backend}/developer/product/create/${userId}`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response => response.json()).catch(e=>e)
}

export const deleteProductDev = (userId,token,productId) => {
    return fetch(`${backend}/developer/product/delete/${productId}/${userId}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        }
    }).then(response=>{
        return response.json()
    }).catch(e=>e)
}

export const editProductDev = (product,productId,userId,token) => {
    return fetch(`${backend}/developer/product/update/${productId}/${userId}`,{
        method: "PUT",
        headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response=>response.json()).catch(e=>console.log(e))
}

export const createCategoryDev = (category,userId,token) => {
    
    let name = {
        name: category
    }

    return fetch(`${backend}/developer/category/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(name)
    }).then(response=>response.json()).catch(e=>e)
}

export const fetchUserDev = (userid) =>{
    return fetch(`${backend}/developer/customers/${userid}`,{
        method: "GET"
    }).then(response=>response.json()).catch(e=>e)
}

export const closeUserAccountDev = (userId,_id,token) => {
    return fetch(`${backend}/developer/customer/close/${_id._id}/${userId}`,{
        method: "DELETE",
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(_id)
    }).then(response=>response.json()).catch(e=>e)
}

export const editUserDev = (developerId,userId,token,formdata) => {
    return fetch(`${backend}/developer/customer/edit/${userId}/${developerId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: formdata
    }).then(response=>response.json()).catch(e=>e)
}

export const editUserAddressDev = (developerId,addressId,token,address) => {
    return fetch(`${backend}/developer/address/edit/${addressId}/${developerId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(address)
    }).then(response=>response.json()).catch(e=>e)
}

export const deleteCategoryDev = (devId,_id,token) => {
    return fetch(`${backend}/developer/category/delete/${_id._id}/${devId}`,{
        method: "DELETE",
        headers:{
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(_id)
    }).then(response=>response.json())
    .catch(e=>e)
}

export const updateCategoryDev = (userId,cateId,cate,token) => {
    return fetch(`${backend}/developer/category/update/${cateId}/${userId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({name: cate})
    }).then(response=>response.json()).catch(e=>e)
}

export const getAllOrdersDev = (userId,token) => {
    return fetch(`${backend}/developer/order/all/${userId}`,{
        method: "GET",
        headers:{
            Accept: "application/json",
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response=>response.json()).catch(e=>e)
}

export const updateOrderStatus = (userId,token,status) => {
    return fetch(`${backend}/developer/order/status/${userId}`,{
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(status)
    }).then(response=>response.json()).catch(e=>e)
}

export const getAllOrderStatusEnums = (userId) => {
    return fetch(`${backend}/developer/order/all/status/${userId}`)
    .then(response=>response.json())
    .catch(e=>e)
}

export const deleteOrderDev = (userId,orderId,token) => {
    return fetch(`${backend}/developer/order/delete/${orderId}/${userId}`,{
        method: "DELETE",
        headers:{
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response=>response.json()).catch(e=>e)
}