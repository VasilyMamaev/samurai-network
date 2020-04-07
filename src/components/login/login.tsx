import React from 'react'
import { connect } from 'react-redux'
import { loginTC } from '../../redux/auth-reducer'
import { Redirect } from 'react-router-dom'
import LoginReduxForm from './login-form'
import { AppStateType } from '../../redux/redux-store'

type MapStatePropsType = {
  isAuth: boolean
  captchaUrl: string | null
}
type MapDispatchPropsType = {
  loginTC: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export type LoginFormValuesType = {
  login: string
  password: string
  rememberMe: boolean
  captcha: string
}

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

  let onSubmit = (formData: LoginFormValuesType) => {
    props.loginTC(formData.login, formData.password, formData.rememberMe, formData.captcha)
  } 

  if (props.isAuth) {
    return <Redirect to='/profile'/>
  } 

  return <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
}


const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
})


export default connect(mapStateToProps, {loginTC} ) (Login)
