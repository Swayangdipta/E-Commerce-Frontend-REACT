const backend = process.env.REACT_APP_BACKEND

export const getUser = (id) => {
    return fetch(`${backend}/user/${id}`,{
        method: 'GET'
    }).then(response=>{
        console.log(response)
        return response.json()
    })
    .catch(e=>console.log(e))
}

export const updateUser = (userId,token,formdata) => {
    return fetch(`${backend}/user/edit/${userId}`,{
        method: "PUT",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: formdata
    }).then(response=>response.json())
        .catch(e=>e)
}

export const deleteUserAccountSelf = (userId,token) => {
    return fetch(`${backend}/user/close/${userId}`,{
        method: 'DELETE',
        headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response=>response.json()).catch(e=>e)
}

export const updateAddress = (userId,token,address,addressId) => {
    return fetch(`${backend}/address/edit/${addressId}/${userId}`,{
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': false,
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(address)
    }).then(response=>response.json())
    .catch(e=>e)
}

export const placeOrder = (userId,token,order) => {
    return fetch(`${backend}/order/create/${userId}`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(order)
    }).then(response=> {
        return response.json()
    }).catch(e=>e)
}

export const pushOrderIntoPurchaseList = (userId,token,orderId) => {
    return fetch(`${backend}/user/pushorder/${userId}`,{
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderId)
    }).then(response=>response.json()).catch(e=>e)
}

export const getOrderById = (id,userId,token) => {
    return fetch(`${backend}/order/${id}/${userId}`,{
        method: 'GET',
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response=>response.json()).catch(e=>e)
}

export const cancelOrder = (orderId,userId,token) => {
    return fetch(`${backend}/order/delete/${orderId}/${userId}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response=>response.json()).catch(e=>e)
}