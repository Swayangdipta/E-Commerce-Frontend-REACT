import React,{useState} from 'react'
import {FaGlobe,FaFacebook,FaInstagram} from 'react-icons/fa'
import {isAuthenticated} from '../Auth/helper/authApiCalls'
import ResponseForm from './ResponseForm'

export default function Footer() {

    const [openForm,setOpenForm] = useState("none")
    const {user} = isAuthenticated()

    return (
        <footer className="footer">
            <div className="developerConnect">
                <div className="developerName">Swayngdipta Das</div>
                |
                <div className="developerSocial">
                    <a href="https://swayangdipta.netlify.app" className="link__external">
                        <div className="developerSocialIndi"><FaGlobe /></div>
                    </a>
                    <a href="https://www.facebook.com/swayangdipta.das.1" className="link__external">
                        <div className="developerSocialIndi"><FaFacebook /></div>
                    </a>
                    <a href="https://www.instagram.com/swayangdiptacs/" className="link__external">
                        <div className="developerSocialIndi"><FaInstagram /></div>
                    </a>
                </div>
            </div>
            <div className="footerMidSection">
                <h3 className="link__external" style={{marginTop: "10px",fontWeight: 'light'}} onClick={e=>setOpenForm("Report")}>
                Report a problem
                </h3>
                <h3 className="link__external" style={{marginTop: "10px",fontWeight: 'light'}} onClick={e=>setOpenForm("Contact")}>
                    Contact
                </h3>
            </div>
            <div className="rights">
                Copyright @ 2022 | <a href="#" className="link__external" style={{textDecoration: 'underline',color:"#000"}}>Terms & Conditions.</a>
            </div>
            {
                openForm === "Contact" && (<ResponseForm user={user ? user : null} type="Contact" setForm={setOpenForm} />)
            }
            {
                openForm === "Report" && (<ResponseForm user={user ? user : null} type="Report" setForm={setOpenForm} />)
            }
        </footer>
    )
}