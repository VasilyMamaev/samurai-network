import React from 'react'
import classes from './user-contacts-form.module.css'
import { reduxForm, Field } from 'redux-form'
import { Input, Textarea } from '../../../../ui/form-controls/form-controls'
import { maxLengthCreator } from '../../../../../utils/validators'

const UserContactsForm = (props) => {
  
  const maxLength = maxLengthCreator(140)

  return (
    <form onSubmit={props.handleSubmit}>
      <button>submit</button>
  { props.error ? <div>{props.error}</div> : null}
      <div>About me:<Field component={Input} validate={maxLength} placeholder='About me' name='aboutMe'/></div>
      <div className={classes.contacts}>
        contacts:<tr/>
        {Object.keys(props.contacts).map(key => {
            return <div key={key}>{key}
                    <Field component={Input} validate={maxLength} placeholder={key} name={'contacts.' + key}/>
                   </div>
        })}
      </div>
      <div>lookingForAJob:<Field component={Input} type='checkbox' name='lookingForAJob'/></div>
      <div>lookingForAJobDescription:<Field component={Textarea} validate={maxLength} placeholder='lookingForAJobDescription' name='lookingForAJobDescription'/></div>
      <div>fullName:<Field component={Input} validate={maxLength} placeholder='fullName' name='fullName'/></div>
    </form>
  )
}

const UserContactsReduxForm = reduxForm({form: 'UserContacts'})(UserContactsForm)

export default UserContactsReduxForm
