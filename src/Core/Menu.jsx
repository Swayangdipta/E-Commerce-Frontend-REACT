import React,{useState,useEffect} from 'react'
import {CgProfile,FiLogIn,FiPlusCircle,FiLogOut,FaShoppingBag,IoIosArrowForward,FaHome,FaEdit} from 'react-icons/all'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import { isAuthenticated, signout } from '../Auth/helper/authApiCalls'
import {Redirect} from 'react-router-dom'

export default function Menu({location='home',setIsCategoryOpen = f => f,isCategoryOpen = undefined,isMenuOpen = undefined, setIsMenuOpen = f=>f}) {
    const {user,token} = isAuthenticated()
    const [didRedirect,setDidRedirect] = useState(false)

    const logout = () => {
        console.log('LogOut');
        signout().then(data=>{
            setDidRedirect(true)
            return toast.success(data,{theme: "dark"})
        })
    }

    return (
        <>
        <section className="menuContainer">
            {didRedirect && (<Redirect to="/" />)}
            <ul className="menuUl">
                <li className="menuItem link menuHeader">Menu</li>
                {location == 'home' ? (
                    token ? (<>
                        <Link to="/profile" className="link"><li className="menuItem">Profile&nbsp; <CgProfile /> </li></Link>
                        {
                            user.role == 5 ? (
                                <Link to="/dashboard" className="link"><li className="menuItem">Dashboard&nbsp; <FaShoppingBag /> </li></Link>    
                            ) : user.role == 2 ? (
                                <Link to="/dashboard" className="link"><li className="menuItem">Dashboard&nbsp; <FaShoppingBag /> </li></Link>
                            ) : user.role == 1 ? (
                                <Link to="/dashboard" className="link"><li className="menuItem">Dashboard&nbsp; <FaShoppingBag /> </li></Link>
                            ) : ''
                        }
                        <Link to="/profile" className="link"><li className="menuItem">My Orders&nbsp; <FaShoppingBag /> </li></Link>
                        <li className="menuItem link" onClick={e=>{
                            setIsCategoryOpen(!isCategoryOpen)
                            setIsMenuOpen(!isMenuOpen)
                            }}>Categories&nbsp; <IoIosArrowForward /> </li>
                        <li className="menuItem link" onClick={logout}>Logout&nbsp; <FiLogOut/> </li>
                    </>) : (<>
                        <li className="menuItem link" onClick={e=>{
                            setIsCategoryOpen(!isCategoryOpen)
                            setIsMenuOpen(!isMenuOpen)
                            }}>Categories&nbsp; <IoIosArrowForward /> </li>
                        <Link to="/login" className="link"><li className="menuItem">Login&nbsp; <FiLogIn/></li></Link>
                        <Link to="/register" className="link"><li className="menuItem">Register&nbsp; <FiPlusCircle/></li></Link>
                    </>)
                ) : location == 'profile' ? (
                    token ? (<>
                        <Link to="/" className="link"><li className="menuItem">Home&nbsp; <FaHome /> </li></Link>
                        {
                            user.role == 5 ? (
                                <Link to="/dashboard" className="link"><li className="menuItem">Dashboard&nbsp; <FaShoppingBag /> </li></Link>    
                            ) : user.role == 2 ? (
                                <Link to="/dashboard" className="link"><li className="menuItem">Dashboard&nbsp; <FaShoppingBag /> </li></Link>
                            ) : user.role == 1 ? (
                                <Link to="/dashboard" className="link"><li className="menuItem">Dashboard&nbsp; <FaShoppingBag /> </li></Link>
                            ) : ''
                        }
                        <li className="menuItem link" onClick={logout}>Logout&nbsp; <FiLogOut/> </li>
                    </>) : (<>
                        <Link to="/login" className="link"><li className="menuItem">Login&nbsp; <FiLogIn/></li></Link>
                        <Link to="/register" className="link"><li className="menuItem">Register&nbsp; <FiPlusCircle/></li></Link>
                    </>)
                ): location == 'cart' ? (
                    token ? (<>
                        <Link to="/" className="link"><li className="menuItem">Home&nbsp; <FaHome /> </li></Link>
                        <Link to="/profile" className="link"><li className="menuItem">Profile&nbsp; <CgProfile /> </li></Link>
                            {
                                user.role == 5 ? (
                                    <Link to="/dashboard" className="link"><li className="menuItem">Dashboard&nbsp; <FaShoppingBag /> </li></Link>    
                                ) : user.role == 2 ? (
                                    <Link to="/dashboard" className="link"><li className="menuItem">Dashboard&nbsp; <FaShoppingBag /> </li></Link>
                                ) : user.role == 1 ? (
                                    <Link to="/dashboard" className="link"><li className="menuItem">Dashboard&nbsp; <FaShoppingBag /> </li></Link>
                                ) : ''
                            }
                            <a href="/profile" className="link"><li className="menuItem">My Orders&nbsp; <FaShoppingBag /> </li></a>
                            <Link to="/profile" className="link"><li className="menuItem">Edit Info&nbsp; <FaEdit /></li></Link>
                            <li className="menuItem link" onClick={logout}>Logout&nbsp; <FiLogOut/> </li>
                        </>) : (<>
                            <Link to="/login" className="link"><li className="menuItem">Login&nbsp; <FiLogIn/></li></Link>
                            <Link to="/register" className="link"><li className="menuItem">Register&nbsp; <FiPlusCircle/></li></Link>
                        </>)
                ) : location == 'dashboard' ? (
                    token ? (<>
                        <Link to="/" className="link"><li className="menuItem">Home&nbsp; <FaHome /> </li></Link>
                        <Link to="/profile" className="link"><li className="menuItem">Profile&nbsp; <CgProfile /> </li></Link>
                            <a href="/profile" className="link"><li className="menuItem">My Orders&nbsp; <FaShoppingBag /> </li></a>
                            <Link to="/profile" className="link"><li className="menuItem">Edit Info&nbsp; <FaEdit /></li></Link>
                            <li className="menuItem link" onClick={logout}>Logout&nbsp; <FiLogOut/> </li>
                        </>) : (<>
                            <Link to="/login" className="link"><li className="menuItem">Login&nbsp; <FiLogIn/></li></Link>
                            <Link to="/register" className="link"><li className="menuItem">Register&nbsp; <FiPlusCircle/></li></Link>
                        </>)
                ) : ''
                
                }
            </ul>
        </section>
        </>
    )
}
