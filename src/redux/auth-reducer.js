import { userAuthAPI, securityAPI } from "../api/api"
import { stopSubmit, change } from "redux-form"

const SET_USER_DATA = 'SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null
}

let authReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        ...action.data,
      } 
    case 'GET_CAPTCHA_URL_SUCCESS':
      return {
        ...state,
        ...action.payload
      }
    default:
       return state
  }
}

export const setUserDataAC = (userId, email, login, isAuth) => ({type: SET_USER_DATA, data: {userId, email, login, isAuth}})
export const getCaptchaUrlSuccessAC = (captchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}})



export const getAuthUserDataTC = () => {
  return (dispatch) => {
    return userAuthAPI.authMe().then((response) => {
      if (response.resultCode === 0) {
        let {id,email,login} = response.data
        dispatch(setUserDataAC(id, email, login, true))
      }
    })
  }
}

export const loginTC = (email, password, rememberMe, captcha) => {
  return (dispatch) => {
    userAuthAPI.userLogin(email, password, rememberMe, captcha).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(getAuthUserDataTC())
      } else {
        if (response.data.resultCode === 10) {
          dispatch(change('login', 'captcha', ''))
          dispatch(getCaptchaTC())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'some error'
        dispatch(stopSubmit('login', {_error: message}))
      }
    })
  }
}

export const logoutTC = () => {
  return (dispatch) => {
    userAuthAPI.userLogout().then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setUserDataAC(null, null, null, false))
      }
    })
  }
}

export const getCaptchaTC = () => async (dispatch) => {

  const response = await securityAPI.getCaptchaUrl()
  const captchaUrl = response.data.url

  dispatch(getCaptchaUrlSuccessAC(captchaUrl))

}

export default authReducer