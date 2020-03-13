import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Textarea } from '../../ui/form-controls/form-controls'
import { maxLengthCreator } from '../../../utils/validators'
import classes from './user-posts-form.module.css'

const maxLength = maxLengthCreator(120)

const UserPostsForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={classes.newPost}>
      <Field className={classes.Textarea} name='newPostText' validate={maxLength} component={Textarea} placeholder='Post text...' />
      <button className={classes.PostBtn}>Post</button>
    </form>
  )
}

let UserPostsReduxForm = reduxForm({form: 'newUserPost'})(UserPostsForm)

export default UserPostsReduxForm
