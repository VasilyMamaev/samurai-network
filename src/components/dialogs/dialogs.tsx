import React from 'react'
import classes from './dialogs.module.css'
import DialogItem from './dialog-item/dialog-item'
import Chat from './chat/chat'
import NewMessageReduxForm from './dialog-item/new-message-form'
import { dialogType } from '../../types/types'

type MapStatePropsType = {
  dialogsElements: Array<dialogType>
  messages: Array<string>
  newTextMessage: string
}

type MapDispatchPropsType = {
  updateTextHandler: (evt: any) => void
  sendMessageHandler: (values: any) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const Dialogs = (props: PropsType) => {

  let dialogsElements = props.dialogsElements.map((dialog) => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id}/>)
  let chatElements = props.messages.map((message) => <Chat>{message}</Chat>)

  let addMessage = (values: any) => {
    props.sendMessageHandler(values)
  }
  return (
    <div className={classes.Dialogs}>
      <div className={classes.DialogsItems}>
        { dialogsElements }
      </div>
      <div className={classes.Chat}>
        { chatElements }
        <NewMessageReduxForm onSubmit={addMessage}/>
      </div>
    </div>
  )
}

export default Dialogs
