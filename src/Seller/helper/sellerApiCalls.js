const backend = process.env.REACT_APP_BACKEND

export const createProduct = (userId,token,product) => {
    return fetch(`${backend}/seller/product/create/${userId}`,{
        method: "POST",
        headers:{
            "Accept": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response => response.json()).catch(e=>e)
}

export const deleteProductSeller = (userId,token,productId) => {
    return fetch(`${backend}/seller/product/delete/${productId}/${userId}`,{
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

export const editProductSeller = (product,productId,userId,token) => {
    return fetch(`${backend}/seller/product/update/${productId}/${userId}`,{
        method: "PUT",
        headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response=>response.json()).catch(e=>console.log(e))
}

export const updateOrderStatusSeller = (userId,token,status) => {
    return fetch(`${backend}/seller/order/status/${userId}`,{
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(status)
    }).then(response=>response.json()).catch(e=>e)
}

export const getAllOrderStatusEnumsSeller = (userId) => {
    return fetch(`${backend}/seller/order/all/status/${userId}`)
    .then(response=>response.json())
    .catch(e=>e)
}

export const deleteOrderSeller = (userId,orderId,token) => {
    return fetch(`${backend}/seller/order/delete/${orderId}/${userId}`,{
        method: "DELETE",
        headers:{
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response=>response.json()).catch(e=>e)
}

export const getPlacedOrdersSeller = (userId) => {
    return fetch(`${backend}/seller/order/all/${userId}`)
    .then(response=>response.json()).catch(e=>e)
}

export const updateOrdersProductStatus = (userId,token,orderId,productId,status) =>{
    console.log("Inside helper");
    return fetch(`${backend}/order/product/status/${orderId}/${userId}`,{
        method: "PUT",
        headers:{
            Accept: 'application/json',
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            productId,
            status
        })
    }).then(response=>response.json()).catch(e=>e)
}