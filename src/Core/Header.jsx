import React, { useState,useEffect } from 'react'
import {FaSearch,BiMenu,FaGithub,FaArrowLeft,IoCaretBack} from 'react-icons/all'
import { searchProduct } from './helper/coreApiCalls'
import Menu from './Menu'
import Results from './Results'
import { getAllCategories } from './helper/coreApiCalls'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'

export default function Header({location='home'}) {
    const [isSearchOpen,setIsSearchOpen] = useState(false)
    const [isMenuOpen,setIsMenuOpen] = useState(false)
    const [search,setSearch] = useState('')
    const [isSearching,setIsSearching] = useState(false)
    const [results,setResults] = useState({
        success: [],
        error: false
    })
    const [isCategoryOpen,setIsCategoryOpen] = useState(false)
    const [categories,setCategories] = useState([])


    const preload = () => {
        getAllCategories().then(data=>{
            if(data){
                if(data.error){
                    console.log(data.error)
                }
                setCategories(data)
            }
        })
    }

    useEffect(() => {
        preload()
    }, [])

    const categorySection = () => (
        <section className="menuContainer categoryContainer">
            <ul className="menuUl">
                <li className="menuItem link menuHeader"><i className="goBackMenu" onClick={e=>{
                    setIsCategoryOpen(!isCategoryOpen)
                    setIsMenuOpen(true)
                    }}><IoCaretBack /></i>Categories</li>
                {
                    categories ? categories.map((cates,index)=>(
                        <Link key={index} style={{
                            textDecoration: 'none',
                            width: '100%',
                            display: 'contents'
                        }} to={`/category/${cates._id}`}><li className="menuItem link" key={index}>{cates.name}</li></Link>
                    )) : (<li className="menuItem link">Loading</li>)
                }
            </ul>
        </section>
    )

    const handleSearch = e =>{
        e.preventDefault()
        toast.info("Searching....",{theme: 'dark'})
        searchProduct(search).then(response=>{
            if(response.error){
                setResults({...results,error: response.error})
                // console.log(response)
                setIsSearching(false)
            }else{
                response.sort(function(a,b){
                    return b.sold - a.sold;
                })
                setResults({...results,success: response})
                // console.log(response)
                setIsSearching(false)
            }
        })
    }

    const searchBox = () =>{
        return(
            <>
            <div className="bg-blur-layer" ></div>
            <div className="searchBox">
                <i className="closeSearch" onClick={e=> {
                    setIsSearchOpen(false)
                    setResults({...results,success: [],error: false})
                    setSearch('')
                    }}><FaArrowLeft /></i>
                <form className="search">
                    <i className="icon"><FaSearch /></i>
                    <input type="text" autoFocus={true} className='searchText' onChange={e=>setSearch(e.target.value)} placeholder="Product name.." />
                    <button type="submit" className="searchProduct" onClick={e=>{
                        setIsSearching(true)
                        handleSearch(e)
                    }}> {isSearching ? ("Searching.."):("Search")} </button>
                </form>
                <div className="searchResults">
                    {}
                    {results.success.length !== 0 ? 
                        results.success.map((item,index)=>(
                            <Results key={index} result={item} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
                        ))
                    : results.error ? (<h1 className="placeHolder">{results.error}</h1>) : (<h1 className="placeHolder" style={{paddingTop: '15px'}}>{isSearching ? ("Please wait.Searching...."):("Search Something.")}</h1>) }
                </div>
            </div>
            </>
        )
    }
    return (
        <header className="header">
            <div className="branding"><Link to="/" style={{
                textDecoration: 'none',
                padding: '0',
                margin: '0',
                color: '#e91e63',
                display: 'contents'
            }}><FaGithub/>&nbsp; Reseller</Link></div>
            <nav className="navbar">
                <div className="searchBar">
                        <i className="searchIcon" onClick={e=>{
                            setIsSearchOpen(true)
                            setIsMenuOpen(false)
                            }}><FaSearch /></i>
                </div>
                <div className="menu" onClick={e=>{
                    setIsMenuOpen(!isMenuOpen)
                    setIsCategoryOpen(false)
                    }}><BiMenu/></div>
            </nav>
            {isSearchOpen && searchBox()}
            {isMenuOpen && (<Menu location={location} isCategoryOpen={isCategoryOpen} setIsCategoryOpen={setIsCategoryOpen} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />)}
            {isCategoryOpen && categorySection()}
        </header>
    )
}