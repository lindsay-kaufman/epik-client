import React from 'react'
import dasies from './../../assets/daisys.png'
import menuIcon from './../../assets/menu.svg'
import './nav-bar.scss'

export const NavBar = () => {
  const today = new Date().toDateString()

  return (
    <div className="nav-bar">
      <img className="nav-bar__dasies" src={dasies} alt="dasies" />
      <div className="nav-bar__wrapper">
        <div className="nav-bar__welcome">Welcome, Lindsay</div>
        <button className="nav-bar__menu">
          <img src={menuIcon} alt="menu-icon" />
        </button>
      </div>
      <div className="nav-bar__date">{today}</div>
    </div>
  )
}
