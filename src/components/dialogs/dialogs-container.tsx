import Dialogs from './dialogs'
import { updateMessageTextAC, addMessageAC, updateMessageTextACType, addMessageACType } from '../../redux/dialogs-reducer'
import { connect } from 'react-redux'
import withUserAuth from '../../hoc/with-user-auth'
import { compose } from 'redux'
import { dialogType } from '../../types/types'
import { Dispatch } from 'react'
import { AppStateType } from '../../redux/redux-store'

type MapStatePropsType = {
  dialogsElements: Array<dialogType>
  messages: Array<string>
  newTextMessage: string
}

type MapDispatchPropsType = {
  updateTextHandler: (evt: any) => void
  sendMessageHandler: (values: any) => void
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
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
