import React from 'react'
import classes from './header.module.css'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/main-logo.png'

const Header = (props) => {
  return (
    <header className={classes.Header}>
      <img src={logo} alt="logo"/>
      { 
      props.isAuth ?
      <span className={classes.headerLogout}>{props.login}<button onClick={props.logoutHandler}>logout</button></span>
      : <NavLink className={classes.headerLogin} to={'/login'}>login</NavLink>
      }
    </header>
  )
}

export default Header
