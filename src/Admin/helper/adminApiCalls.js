const API = process.env.REACT_APP_BACKEND

export const fetchUsers = (userid) => {
    return fetch(`${API}/admin/customers/${userid}`,{
        method: "GET"
    }).then(response=>response.json()).catch(e=>e)
}

export const closeUserAccount = (userId,customerId,token) => {
    return fetch(`${API}/admin/customer/close/${customerId}/${userId}`,{
        method: "DELETE",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(customerId)
    }).then(response=>response.json()).catch(e=>e)
}

export const editUserAdmin = (developerId,userId,token,formdata) => {
    return fetch(`${API}/admin/customer/edit/${userId}/${developerId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: formdata
    }).then(response=>response.json()).catch(e=>e)
}

export const editUserAddressAdmin = (developerId,addressId,token,address) => {
    return fetch(`${API}/admin/address/edit/${addressId}/${developerId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(address)
    }).then(response=>response.json()).catch(e=>e)
}

export const deleteProductAdmin = (userId,token,productId) => {
    return fetch(`${API}/admin/product/delete/${productId}/${userId}`,{
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

export const editProductAdmin = (product,productId,userId,token) => {
    return fetch(`${API}/admin/product/update/${productId}/${userId}`,{
        method: "PUT",
        headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response=>response.json()).catch(e=>console.log(e))
}

export const deleteCategoryAdmin = (adminId,_id,token) => {
    return fetch(`${API}/admin/category/delete/${_id._id}/${adminId}`,{
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

export const createCategoryAdmin = (category,userId,token) => {
    
    let name = {
        name: category
    }

    return fetch(`${API}/admin/category/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(name)
    }).then(response=>response.json()).catch(e=>e)
}

export const updateCategoryAdmin = (userId,cateId,cate,token) => {
    return fetch(`${API}/developer/category/update/${cateId}/${userId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({name: cate})
    }).then(response=>response.json()).catch(e=>e)
}

export const getAllOrdersAdmin = (userId,token) => {
    return fetch(`${API}/admin/order/all/${userId}`,{
        method: "GET",
        headers:{
            Accept: "application/json",
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response=>response.json()).catch(e=>e)
}

export const updateOrderStatusAdmin = (userId,token,status) => {
    return fetch(`${API}/admin/order/status/${userId}`,{
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(status)
    }).then(response=>response.json()).catch(e=>e)
}

export const getAllOrderStatusEnumsAdmin = (userId) => {
    return fetch(`${API}/admin/order/all/status/${userId}`)
    .then(response=>response.json())
    .catch(e=>e)
}

export const deleteOrderAdmin = (userId,orderId,token) => {
    return fetch(`${API}/admin/order/delete/${orderId}/${userId}`,{
        method: "DELETE",
        headers:{
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response=>response.json()).catch(e=>e)
}