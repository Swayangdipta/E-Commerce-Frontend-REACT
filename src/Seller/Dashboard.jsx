import React from 'react'
import Header from '../Core/Header'
import Footer from '../Core/Footer'
import BaseDashBoard from '../Core/BaseDashBoard'

function Dashboard() {
    return (
        <>
            <Header location='dashboard'/>

            <BaseDashBoard  />

            <Footer />
        </>
    )
}

export default Dashboard
