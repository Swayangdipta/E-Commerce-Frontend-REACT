import React,{useState,useEffect} from 'react'
import SignInForm from '../Auth/SignInForm'
import Header from './Header'
import Footer from './Footer'
import { getAllProducts, getAllCategories } from './helper/coreApiCalls'
import { toast } from 'react-toastify'
import Item from './Item'
import {TiArrowSortedDown,BsToggles,FaPlusCircle,BsPlusLg,BsPlusCircle} from 'react-icons/all'
import { Link } from 'react-router-dom'
import Hero from './Hero'


export default function Home() {

    const [product,setProduct] = useState({
        error: false,
        products: []
    })

    const [categories,setCategories] = useState({
        error: false,
        all: []
    })

    const [openActive,setOpenActive] = useState(true)



    const preload = () => {
        getAllProducts().then(data=>{
            if(data){
                if(data.error){
                    setProduct({...product,error: data.error})
                }

                data.sort(function(a,b){
                    return b.sold - a.sold;
                })

                setProduct({...product,products: data})
            }
        })

        getAllCategories().then(data=>{
            if(data){
                if(data.error){
                    setCategories({...categories,error: data.error})
                }
                setCategories({...categories,all: data})
            }
        })
    }

    useEffect(()=>{
        preload()
    },[])

    return (
        <div>

            <Header/>
            <Hero />

            {
                openActive ? (
                categories.all.length > 0 ? (
                    categories.all.map((category,index)=>(
                        index < 5 && (
                            <div className={`allItems__container`} key={index}>
                                <header className="sectionHeader allItems__header">
                                    {category.name}
                                </header>
                                <div className={`allItems ${category.name}`} style={{height: '250px'}}>
                                    {
                                        product.products && product.products.map((prod,inde)=>{
                                            if(prod.category){
                                                if(prod.category._id === category._id){
                                                    return(
                                                        inde < 15 ? (
                                                            <Item openActive={openActive} setOpenActive={setOpenActive} product={prod} key={inde} location="home" />
                                                        ) : ''
                                                    )
                                                }
                                            }
                                        })
                                    }
                                    <Link to={`/category/${category._id}`}>
                                        <div className="item__container viewExtra__open"
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}>
                                            <i className="viewAll__sameCategory">
                                                <BsPlusLg/>
                                            </i>
                                        </div>
                                    </Link>
                                </div>     
                                <footer className="sectionHeader allItems__footer" style={{cursor: 'pointer'}} onClick={e=>{
                                    if(document.querySelector(`.${category.name}`).style.height == '250px'){
                                        document.querySelector(`.${category.name}`).style.height = 'max-content';
                                    }else{
                                        document.querySelector(`.${category.name}`).style.height = '250px';
                                    }
                                }}>
                                    Toggle <i className="viewAll__icon"><BsToggles /></i>
                                </footer>           
                            </div>
                    )

                    ))
                ) : ('')                    
                ) : ('')

            }

            <Footer />
            {
                product.error && toast.error(product.error,{theme: 'dark'})
            }
        </div>
    )
}
