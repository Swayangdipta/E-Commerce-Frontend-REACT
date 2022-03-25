import React,{useState,useEffect} from 'react'
import {CgClose} from 'react-icons/cg'
import {FcCustomerSupport} from 'react-icons/fc'
import {MdOutlineError} from 'react-icons/md'
import { toast } from 'react-toastify'
import { recordContact, recordProblem } from './helper/coreApiCalls'

const ResponseForm = ({user=undefined,type="Contact",setForm=f=>f}) => {


    const [inputs,setInputs] = useState({
        name: "",
        email: "",
        response: ""
    })

    useEffect(()=>{
        if(user){
            setInputs({...
                inputs,
                name: user.name,
                email: user.email
            })
        }
    },[])

    const handleSubmit = e => {
        e.preventDefault()
        if(type == "Contact"){
            recordContact(inputs).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: 'dark'})
                    }else{
                        toast.success("Your response has been submitted.")
                        setForm(false)
                    }
                }
            })
        }else{
            recordProblem(inputs).then(data=>{
                if(data){
                    if(data.error){
                        toast.error(data.error,{theme: 'dark'})
                    }else{
                        toast.success("Your response has been submitted.")
                        setForm(false)
                    }
                }
            })
        }
    }

  return (
      <div className="responseForm__Wrapper">

        <div className="reponseForm__container">
            <div className="responseForm__close" style={type=="Contact" ? {color: "#2196f3"}:{}} onClick={e=>setForm("none")}><CgClose /></div>
                <div className="responseForm__hero" style={type=="Contact" ? {background: "#2196f3"}:{}}>
                    <div className="responseForm__heroIcon">
                        {
                            type == "Contact" ? (<FcCustomerSupport />) : (<MdOutlineError />)
                        }
                    </div>
                    <div className="responseForm__hero__message">
                        <h2 className="responseForm__hero__heading">
                        {
                            type == "Contact" 
                                ? ("Got a query?") 
                                : ("Got problems?")
                        }
                        </h2>
                        <p className="responseForm__hero__para">
                        {
                            type == "Contact" 
                                ? ("We are happy to help!") 
                                : ("Just submit your report!")
                        }
                        </p>
                    </div>
                </div>

                <div className="responseForm__form" style={type=="Contact" ? {color: "#2196f3"}:{}}>
                    <label htmlFor="name" className="responseForm__label" style={type=="Contact" ? {color: "#2196f3"}:{}}>Name</label>
                    <input value={inputs.name} type="text" name="name" id="" className="responseForm__inputs" onChange={e=>setInputs({...inputs,name: e.target.value})} style={type=="Contact" ? {color: "#000"}:{}}/>

                    <label htmlFor="email" className="responseForm__label" style={type=="Contact" ? {color: "#2196f3"}:{}}>Email</label>
                    <input value={inputs.email} type="email" name="email" id="" className="responseForm__inputs"  onChange={e=>setInputs({...inputs,email: e.target.value})} style={type=="Contact" ? {color: "#000"}:{}}/>

                    <label htmlFor="response" className="responseForm__label" style={type=="Contact" ? {color: "#2196f3"}:{}}> {type == "Contact"?("Message"):("Problem")}</label>
                    <textarea value={inputs.response} name="response" id="" cols="30" rows="5" className="responseForm__inputs responseForm__textarea"  onChange={e=>setInputs({...inputs,response: e.target.value})} style={type=="Contact" ? {color: "#000"}:{}} placeholder="Please write your response here..."></textarea>

                    <button onClick={handleSubmit} type="submit" className="responseForm__submit" style={type=="Contact" ? {background: "#2196f3"}:{}}>{type == "Contact"?("Send"):("Report")}</button>
                </div>            
        </div>

      </div>

  )
}

export default ResponseForm