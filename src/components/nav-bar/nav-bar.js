import React from 'react'
import './nav-bar.scss'

export const NavBar = () => {
  const today = new Date().toDateString()

  return (
    <nav className="nav-bar">
      <div className="nav-bar__wrapper">
        <div className="nav-bar__title">Make Everyday Epik</div>
        <div className="nav-bar__date">{today}</div>
      </div>
    </nav>
  )
}
