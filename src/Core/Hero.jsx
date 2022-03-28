import React from 'react'
import {IoIosArrowDown} from 'react-icons/io'
import bg from '../assets/image/hero.jpg'

const Hero = () => {
  return (
    <div className='Main__Hero'>
        <img src={bg} alt="" className="Hero__bg" />
        <h1 className="Hero__title">Re-Sell Anything</h1>
        <h3 className="Hero__subTitle">Buy , Sell and Re-Sell anything in your neighbourhood.</h3>
        <div className="Hero__Encouragement">
            <h4 className="Hero__Message">Explore and Find All The SecondHand Things at the lowest price</h4>
            <i className="Hero__explore"><IoIosArrowDown  style={{
                animation: "goUpDown 1.7s ease-in-out infinite"
            }} /></i>
        </div>
    </div>
  )
}

export default Hero