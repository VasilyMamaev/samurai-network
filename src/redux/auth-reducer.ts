import { userAuthAPI, securityAPI } from "../api/api"
import { stopSubmit, change } from "redux-form"
import { ThunkAction } from "redux-thunk"
import { AppStateType } from "./redux-store"

const SET_USER_DATA = 'SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'

type stateType = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
  captchaUrl: string | null
}

const initialState: stateType = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null
}

let authReducer = (state = initialState, action: AuthActionsTypes): stateType => {
  switch(action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        ...action.payload,
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

type setUserDataACPayloadType = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}
type setUserDataACType = {
  type: typeof SET_USER_DATA
  payload: setUserDataACPayloadType
}
export const setUserDataAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setUserDataACType => ({
  type: SET_USER_DATA,
  payload: {userId, email, login, isAuth}
})

type getCaptchaUrlSuccessAC = {
  type: typeof GET_CAPTCHA_URL_SUCCESS
  payload: {captchaUrl: string}
}
export const getCaptchaUrlSuccessAC = (captchaUrl: string): getCaptchaUrlSuccessAC => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}})

type AuthActionsTypes = setUserDataACType | getCaptchaUrlSuccessAC

type AuthThunkType = ThunkAction<void, AppStateType, unknown, AuthActionsTypes>

export const getAuthUserDataTC = (): AuthThunkType => {
  return (dispatch) => {
    return userAuthAPI.authMe().then((response) => {
      if (response.resultCode === 0) {
        let {id,email,login} = response.data
        dispatch(setUserDataAC(id, email, login, true))
      }
    })
  }
}

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string): AuthThunkType => {
  return (dispatch) => {
    userAuthAPI.userLogin(email, password, rememberMe, captcha).then((response: any) => {
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

export const logoutTC = (): AuthThunkType => {
  return (dispatch) => {
    userAuthAPI.userLogout().then((response: any) => {
      if (response.data.resultCode === 0) {
        dispatch(setUserDataAC(null, null, null, false))
      }
    })
  }
}

export const getCaptchaTC = (): AuthThunkType => async (dispatch) => {

  const response = await securityAPI.getCaptchaUrl()
  const captchaUrl = response.data.url

  dispatch(getCaptchaUrlSuccessAC(captchaUrl))

}

export default authReducer