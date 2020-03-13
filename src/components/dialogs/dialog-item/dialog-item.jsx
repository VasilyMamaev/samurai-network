import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './dialog-item.module.css'

const Dialog = (props) => {
  return (
    <div className={classes.DialogItem}>
      <NavLink to={"/Dialogs/" + props.id}>{props.name}</NavLink>
    </div>
  )
}

export default Dialog
