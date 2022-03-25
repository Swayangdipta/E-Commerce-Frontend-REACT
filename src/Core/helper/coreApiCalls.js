const backend = process.env.REACT_APP_BACKEND

export const searchProduct = (query) => {
    return fetch(`${backend}/products/search?search=${query}`,{
        method: "GET"
    }).then(response => {
        console.log(response);
        return response.json()
    }).catch(err => console.log(err))
}

export const getProductPhotos = (id) => {
    return fetch(`${backend}/product/photo/${id}`,{
        method: 'GET'
    }).then(response => {
        // console.log(response.json())
       return response.json()
    })
    .catch(e=> e)
}

export const getSingleProductPhoto = (id,_id) =>{
    return fetch(`${backend}/product/single/photo/${_id}?photo=${id}`,{
        method: 'GET'
    }).then(response => {
        // console.log(response)
       return response
    }).catch(e=> e)
}

export const getAllCategories = () => {
    return fetch(`${backend}/categories`,{
        method: 'GET'
    }).then(response=>response.json())
}

export const createAddress = (address) => {
    return fetch(`${backend}/address/create`,{
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(address)
    }).then(response=> response.json())
}

export const getAllProducts = () => {
    return fetch(`${backend}/products`)
    .then(response=>response.json())
    .catch(e=>console.log(e))
}

export const getSingleProduct = id => {
    return fetch(`${backend}/product/${id}`).then(response=>response.json()).catch(e=>e)
}

export const recordContact = contact => {
    return fetch(`${backend}/contact/record`,{
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(contact)
    }).then(response=>response.json()).catch(e=>e)
}

export const recordProblem = problem => {
    return fetch(`${backend}/problem/record`,{
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(problem)
    }).then(response=>response.json()).catch(e=>e)
}

export const getAllProductsByCategory = category => {
    return fetch(`${backend}/products/category?category=${category}`)
                .then(response=>response.json())
                .catch(e=>e)
}