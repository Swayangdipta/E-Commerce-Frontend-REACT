import React,{useState} from 'react'
import { isAuthenticated } from '../Auth/helper/authApiCalls'
import {FaEdit,CgRemove,CgMail,FaUserShield,FaShoppingBag,FaShoppingBasket,RiDashboard2Fill,FaRegEdit} from 'react-icons/all'
import Orders from './Orders'
import { Link } from 'react-router-dom'
import EditInfo from './EditInfo'
import EditAddress from './EditAddress'
import DeleteAccount from './DeleteAccount'


const backend = process.env.REACT_APP_BACKEND

export default function ProfileCard() {

    const [openActive,setOpenActive] = useState('profileCard')
    const [activeComponent,setActiveComponent] = useState(false)
    const {user} = isAuthenticated()
    let role = 'user'

    switch (user.role) {
        case 5:
            role = 'Developer'
            break;
        case 2:
            role = 'Admin'
            break;
        case 1:
            role = 'Seller'
            break;
        case 0:
            role = 'user'
            break;
    }

    return (
        <>
            {        
            openActive === 'profileCard' ? (
                <section className="profileCard">
                <div className="userDetails">
                <span className="image__background__cover"><p className="image__background__cover__text">Profile</p></span>
                    <aside className="profilePic">
                        <img src={`${backend}/user/image/${user._id}`} className="dp animatedBorder" />
                    </aside>
                    <aside className="userInfo">
                        <h2 className="user_name">{user.name}</h2>
                        {
                            user.role>0 ? (
                                <>
                                <h1 className="user_role"><i className="user_icon"><FaUserShield /> </i>&nbsp; {role} Account</h1>
                                <h1 className="user_role user_email user_icon"><i className="user_icon"><CgMail /></i>&nbsp; {user.email}</h1>
                                </>
                            ) : (<h1 className="user_role user_email">{user.email}</h1>)   
                        }
                        <p className="otherInfo" onClick={e=>setOpenActive('editInfo')}><FaEdit className="icons" />&nbsp; Edit Info</p>
                        <p className="otherInfo dangerZone" onClick={e=>setActiveComponent('deleteAccount')}><CgRemove className="icons" />&nbsp; Delete Account</p>
                    </aside>
                </div>
                <aside className="profileLinks">
                    <header className="sectionHeader">Profile Links</header>
                    <section className="profile__links">
                        <div className="profile__links__items" style={{background: 'linear-gradient(45deg,#e91e63, #9c27b0)'}} onClick={()=>setOpenActive('orders')} ><i><FaShoppingBag/></i>&nbsp;Orders</div>
                        <div className="profile__links__items" style={{background: 'linear-gradient(45deg,#4caf50, #009688)'}} onClick={()=>setOpenActive('editAddress')}><i><FaRegEdit/></i>&nbsp;Edit Address</div>
                        <Link className='Link__reactRouter' to="/cart" ><div className="profile__links__items" style={{background: 'linear-gradient(45deg,#ffc107, #ff5722)'}} onClick={()=>setOpenActive('cart')} ><i><FaShoppingBasket/></i>&nbsp;Cart</div></Link>
                        {
                            user.role > 0 ? (
                                <Link className='Link__reactRouter' to="/dashboard" ><div className="profile__links__items" style={{background: 'linear-gradient(45deg,#f44336, #e91e63)'}}><i><RiDashboard2Fill/></i>&nbsp;Dashboard</div></Link>
                            ) : ('')
                        }
                    </section>
                </aside>
            </section>
            ) :
            openActive === 'orders' ? (
                <Orders openActive={openActive} setOpenActive={setOpenActive} />
            ) : openActive === 'editInfo' ? (
                <EditInfo setOpenActive={setOpenActive} user={user} />
            ) : openActive === 'editAddress' ? (
                <EditAddress setOpenActive={setOpenActive} />
            ) : ''
            }
            {
                activeComponent === 'deleteAccount' ? (<DeleteAccount setActiveComponent={setActiveComponent} />) : ''
            }
        </>
    )
}
