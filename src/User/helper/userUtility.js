export const addItemToCart = (item,count,next) => {
    if(typeof window !== "undefined"){
        let cart = []
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }

        if(item.photos){
            item.photos.map(i=>{
                if(i.data){
                    i.data=undefined
                }
            })
        }

        cart.push({...item,count: count})
        localStorage.setItem("cart",JSON.stringify(cart))
        next()
    }
}

export const loadItemsFromCart = () => {
    if(typeof window !== "undefined"){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}

export const removeItemsFromCart = (productId) => {
    let cart = []
    if(typeof window !== "undefined"){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((product,index)=>{
            if(product._id === productId){
                cart.splice(index,1)
            }
        })
        localStorage.setItem('cart',JSON.stringify(cart))
    }
}

export const emptyTheCart = () => {
    let cart = []
    if(typeof window !== "undefined"){
        if(localStorage.getItem('cart')){
            localStorage.setItem('cart',JSON.stringify(cart))
        }

    }
}

export const setOrderInLocalStorage = (product) => {
    let order = product
    if(typeof window !== "undefined"){
        localStorage.setItem('order',JSON.stringify(order))
    }
}

export const getOrderFromLocalStorage = () => {
    if(typeof window !== "undefined"){
        if(localStorage.getItem('order')){
            return localStorage.getItem('order')
        }
    }
}