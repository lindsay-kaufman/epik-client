import React from 'react'
import menuIcon from './../../assets/menu.svg'
import daisyIcon from './../../assets/daisy.png'
import './nav-bar.scss'

export const NavBar = () => {
  const today = new Date().toDateString()

  // change to say week or month when view switchdes
  
  return (
    <nav className="nav-bar">
      <div className="nav-bar__wrapper">
        <div className="nav-bar__welcome">Make Everyday Epik</div>
        <button className="nav-bar__menu">
          <img src={menuIcon} alt="menu-icon" />
        </button>
      </div>
      <div className="nav-bar__date">{today}</div>
    </nav>
  )
}
