import React,{useState} from 'react'
import { isAuthenticated } from '../Auth/helper/authApiCalls'
import {CgClose} from 'react-icons/all'
import CreateProductForm from '../Seller/CreateProductForm'
import MyProducts from '../Seller/MyProducts'
import CreateCategory from '../Seller/CreateCategory'
import ManageUsers from '../Admin/ManageUsers'
import ManageProducts from '../Admin/ManageProducts'
import ManageCategories from '../Admin/ManageCategories'
import ManageOrders from '../Admin/ManageOrders'

function BaseDashBoard() {

    const [openActive,setOpenActive] = useState(false)
    const [openAction,setOpenAction] = useState(false)

    const {user,token} = isAuthenticated()

    // const randomColor = [
    //     'linear-gradient(45deg,#6441a5,#2a0845)',
    //     'linear-gradient(45deg,#ffa11b,#aa1dbb)',
    //     'linear-gradient(45deg,#43cea2,#185a9d)',
    //     'linear-gradient(45deg,#360033,#0b8793)',
    //     'linear-gradient(45deg,#9d50bb,#6e48aa)'
    // ]

    const sellerActions = () => {
        return(
            <ul className="dashboard__actions__list">
                <li className="dashboard__actions__items" onClick={e=>setOpenAction("myProducts")}>Manage Products</li>
                <li className="dashboard__actions__items" onClick={e=>setOpenAction("createProduct")}>Create Product</li>
                <li className="dashboard__actions__items" onClick={e=>setOpenAction("manageOrders")}>View Orders</li>
                <li className="dashboard__actions__items">View Sells</li>
            </ul>
        )
    }

    const developerActions = () => {
        return(
            <ul className="dashboard__actions__list">
                <li className="dashboard__actions__items" onClick={e=>setOpenAction("manageUsers")}>Manage Users</li>
                <li className="dashboard__actions__items" onClick={e=>setOpenAction("manageProducts")}>Manage Products</li>
                <li className="dashboard__actions__items" onClick={e=>setOpenAction("manageOrders")}>Manage Orders</li>
                <li className="dashboard__actions__items" onClick={e=>setOpenAction("manageCategories")}>Manage Categories</li>
                <li className="dashboard__actions__items" >View Sells</li>
                <li className="dashboard__actions__items" >View Problems</li>
                <li className="dashboard__actions__items" onClick={e=>setOpenAction("myProducts")} >My Products</li>
                <li className="dashboard__actions__items" onClick={e=>setOpenAction("createProduct")} >Create Product</li>
                <li className="dashboard__actions__items" onClick={e=>setOpenAction("createCategory")}>Create Category</li>
            </ul>
        )
    }

    const adminActions = () => {
        return(
            <ul className="dashboard__actions__list">
                <li className="dashboard__actions__items" onClick={e=>setOpenAction("manageUsers")}>Manage Users</li>
                <li className="dashboard__actions__items" onClick={e=>setOpenAction("manageProducts")}>Manage Products</li>
                <li className="dashboard__actions__items" onClick={e=>setOpenAction("manageOrders")}>Manage Orders</li>
                {/* <li className="dashboard__actions__items" onClick={e=>setOpenAction("manageCategories")}>Manage Categories</li> */}
                <li className="dashboard__actions__items">View Sells</li>
                <li className="dashboard__actions__items">View Problems</li>
            </ul>
        )
    }

    const dashboardActions = () => (
        <div className="dashboard__actions">
            <header className='sectionHeader' style={{
                borderRadius: "0px"
            }}>
                <p className='orders__title' style={{userSelect: 'none'}}>Actions</p>
                <i className="orders__goback" onClick={e=>setOpenActive(false)} style={{position: 'absolute',right:'20px',color: '#e91e63',fontSize: '32px',userSelect: 'none'}}><CgClose /></i>
            </header>

            {
                user.role === 1 ? (sellerActions()) : user.role === 2 ? (adminActions()) : user.role === 5 ? (developerActions()) : ''
            }
        </div>
    )


    return (
        <div className='dashboard__container'>
            <div className="dashboard__actions__container">
                <div className="dashboard__options" onClick={e=>setOpenActive('actions')}>Actions</div>
                {/* <div className="dashboard__options"></div>
                <div className="dashboard__options"></div> */}
            </div>
            <div className="dashboard__metrics">

            </div>

            {
                openActive === 'actions' ? (dashboardActions()) : ''
            }


            {
                openAction === 'createProduct' ? (<CreateProductForm setOpenAction={setOpenAction} user={user.role} userId={user._id} />) 
                : openAction === 'myProducts' ? (<MyProducts setOpenAction={setOpenAction} />) 
                : openAction === 'createCategory' ? (<CreateCategory setOpenAction={setOpenAction} />)
                : openAction === 'manageUsers' ? (<ManageUsers setOpenAction={setOpenAction} userId={user._id} role={user.role} developerID = {user._id} token={token} />) 
                : openAction === 'manageProducts' ? (<ManageProducts setOpenAction={setOpenAction}/> ) 
                : openAction === 'manageCategories' ? (<ManageCategories setOpenAction={setOpenAction} user={user} token={token} /> )
                : openAction === 'manageOrders' ? (<ManageOrders setOpenAction={setOpenAction} user={user} token={token} /> ) : ''
            }
        </div>
    )
}

export default BaseDashBoard
