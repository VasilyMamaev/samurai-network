import React from 'react'
import classes from './user.module.css'
import { NavLink } from 'react-router-dom'

type PropsType = {
  id: number
  followHandler: (id: number, followed: boolean) => void
  avatar: string
  followed: boolean
  followInProgress: Array<number>
  name: string
  userStatus: string | null
  city: string
  country: string
}

const User: React.FC<PropsType> = (props) => {
  return (
    <div className={classes.User}>
      <div className={classes.userAvatar}>
        <NavLink to={'/Profile/' + props.id}>
          <img src={props.avatar} alt="avatar"/>
        </NavLink>
        <button onClick={() => {props.followHandler(props.id, props.followed)}} disabled={props.followInProgress.some(id => id === props.id)}>
          {props.followed ? 'followed' : 'unfollowed'}
        </button>  
      </div>
      <div className={classes.userDescription}>
        <span>{props.name}</span>
        <span>{props.userStatus}</span>
        <span>{props.city}</span>
        <span>{props.country}</span>
      </div>
    </div>
  )
}

export default User
