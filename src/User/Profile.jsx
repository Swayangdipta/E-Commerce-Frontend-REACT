import React from 'react'
import Footer from '../Core/Footer'
import Header from '../Core/Header'
import ProfileCard from './ProfileCard'

export default function Profile() {
    return (
        <div className="profile">
            <Header location='profile' />

            <ProfileCard />

            <Footer />
        </div>
    )
}
