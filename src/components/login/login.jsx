import React from 'react'
import LoginForm from './login-form'
import { connect } from 'react-redux'
import { loginTC } from '../../redux/auth-reducer'
import { Redirect } from 'react-router-dom'

function Login(props) {

  let onSubmit = (formData) => {
    props.loginTC(formData.login, formData.password, formData.rememberMe, formData.captcha)
  } 

  if (props.isAuth) {
    return <Redirect to='/profile'/>
  } 

  return <LoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
}


const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
})


export default connect(mapStateToProps, {loginTC} ) (Login)
