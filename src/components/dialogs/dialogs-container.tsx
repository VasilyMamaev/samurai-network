import Dialogs from './dialogs'
import { updateMessageTextAC, addMessageAC, updateMessageTextACType, addMessageACType } from '../../redux/dialogs-reducer'
import { connect } from 'react-redux'
import withUserAuth from '../../hoc/with-user-auth'
import { compose } from 'redux'
import { dialogType } from '../../types/types'
import { appStateType } from '../../redux/redux-store'
import { Dispatch } from 'react'

type MapStatePropsType = {
  dialogsElements: Array<dialogType>
  messages: Array<string>
  newTextMessage: string
}

type MapDispatchPropsType = {
  updateTextHandler: (evt: any) => void
  sendMessageHandler: (values: any) => void
}

let mapStateToProps = (state: appStateType): MapStatePropsType => {
  return {
    dialogsElements: state.dialogs.dialogsElements,
    messages: state.dialogs.messages,
    newTextMessage: state.dialogs.newTextMessage
  }
}

let mapDispatchToProps = (dispatch: Dispatch<updateMessageTextACType | addMessageACType>): MapDispatchPropsType => {
  return {
    updateTextHandler: (evt) => {
      dispatch(updateMessageTextAC(evt.target.values))
    },
    sendMessageHandler: (values) => {
      dispatch(addMessageAC(values.messageText))
    }
  }
} 

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withUserAuth
) (Dialogs)
