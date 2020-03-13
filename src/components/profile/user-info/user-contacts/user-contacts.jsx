import React from 'react'
import classes from './user-contacts.module.css'
import { useState } from 'react'
import UserContactsReduxForm from './user-contats-form/user-contacts-form'

const UserContacts = (props) => {

  let [editMode, setEditMode] = useState(false)

  const contacts = Object.keys(props.userInfo.contacts).map(key => {
  return  <div className={classes.contactItem}>
            <a href={props.userInfo.contacts[key]}>
              <img src={require(`../../../../assets/images/pofile-links/${key}${props.userInfo.contacts[key] ? '' : '-disabled'}.svg`)} alt={`link to ${key}`}></img>
            </a>
          </div>
  })

  const onSubmit = async (formData) => {
    await props.updateUserContacts(formData)
    setEditMode(false)
  }
  
  if (editMode) {
    return (
      <UserContactsReduxForm onSubmit={onSubmit} initialValues={props.userInfo} contacts={props.userInfo.contacts}/>
    )
  } else {
    return (
      <div className={classes.UserContacts}>
        { !props.isAuth ? null : <button onClick={() => setEditMode(true)}>edit profile</button> }
        <div className={classes.userInfoItem}><b>About me:</b><span>{props.userInfo.aboutMe}</span></div>

        <div className={classes.userInfoItem}><b>Looking for a job:</b><span>{props.userInfo.lookingForAJob ? 'yes' : 'no' }</span></div>
        <div className={classes.userInfoItem}><b>Looking for a job description:</b><span>{props.userInfo.lookingForAJobDescription}</span></div>
        <div className={classes.userInfoItem}><b>Full name:</b><span>{props.userInfo.fullName}</span></div>
        <div className={classes.userInfoItem}>
          <b>contacts:</b>
          <div className={classes.contacts}>
            {contacts}
          </div>
        </div>
      </div>
    )
  }
}

export default UserContacts
