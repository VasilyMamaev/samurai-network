import React from 'react'
import classes from './navbar.module.css'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className={classes.Nav}>
      <ul>
        <li><NavLink to='/Profile' activeClassName={classes.active}>Profile</NavLink></li>
        <li><NavLink to='/Dialogs' activeClassName={classes.active}>messages</NavLink></li>
        <li><NavLink to='/News' activeClassName={classes.active}>News</NavLink></li>
        <li><NavLink to='/Music' activeClassName={classes.active}>Music</NavLink></li>
        <li><NavLink to='/Users' activeClassName={classes.active}><span>Users</span></NavLink></li>
        <li></li>
      </ul>
    </nav>
  )
}

export default Navbar