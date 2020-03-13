import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Textarea } from '../../ui/form-controls/form-controls'
import { maxLengthCreator } from '../../../utils/validators'

const maxLength = maxLengthCreator(300)

const NewMessageForm = (props) => {

  return (
    <form onSubmit={props.handleSubmit}>
      <Field  component={Textarea} validate={[maxLength]} name='messageText' placeholder='Text message...'/>
      <button>Send message</button>
    </form>
  )
}

const NewMessageReduxForm = reduxForm({form: 'newMessage'})(NewMessageForm)

export default NewMessageReduxForm
