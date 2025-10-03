import React from 'react'
import Navbar from '../components/Navbar'
import './home.css'
const home = () => {
  return (
    <div>
        <Navbar/>
        <div className="home-body-cont">
          <div className="home-body-cont-heading">
            <h1>Pt. Madan Mohan Malaviya </h1>
            <p>Hall of Residence </p>
          </div>
        </div>
    </div>
  )
}

export default home
