const backend = process.env.REACT_APP_BACKEND

export const signIn = (user) => {
    return fetch(`${backend}/login`,{
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(response=>{
        return response.json()
    }).catch(err=>{
        console.log(err)
    })
}

export const signup = (user) => {
    return fetch(`${backend}/register`,{
        method: "POST",
        headers:{
            Accept: 'application/json'
        },
        body: user
    }).then(response=>response.json())
}

export const signout = () =>{
    if(typeof window != undefined){
        localStorage.removeItem("jwt")
        return fetch(`${backend}/logout`).then(response=>response.json())
    }
}

export const authenticate = (data,next) => {
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt",JSON.stringify(data))
        next()
    }
}

export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false
    }
}