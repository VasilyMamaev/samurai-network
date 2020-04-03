import { usersAPI, userProfileAPI } from "../api/api"
import { stopSubmit } from "redux-form"
import { userInfoType, userPostType, userInfoPhotosType } from "../types/types"

const ADD_POST = 'ADD-POST'
const DELETE_POST = 'DELETE_POST'
const SET_PROFILE = 'SET_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SAVE_AVATAR_IMG_SUCCESS = 'SAVE_AVATAR_IMG_SUCCESS'
const SET_USER_CONTACTS = 'SET_USER_CONTACTS'

const initialState = {
  userInfo: null as userInfoType | null,
  userPosts: [
    {id: 1, message: 'Шёл сегодня с работы домой, на улице темнотища, иду с фонариком. Смотрю, впереди на снегу необычные образования. Пригляделся - следы :) По свежевыпавшему пушистому снегу прошлись, а потом ветер выдул весь снег, оставив только спрессованные ногами следы от ботинок. Впервые такое вижу.',likesCount: 99},
    {id: 2, message: 'Как-то стороной обходили Поль Бейкери, а оказывается там весьма неплохо.',likesCount: 9}
  ] as Array<userPostType>,
  userStatus: ''
}

type stateType = typeof initialState

let profileReducer = (state = initialState, action: any):stateType => {
  switch (action.type) {
    case 'SET_PROFILE': 
      return {
        ...state,
        userInfo: {
          ...action.userInfo,
          contacts: action.userInfo.contacts,
          photos: action.userInfo.photos
        }
      }
    case 'ADD-POST':
      return {
        ...state,
        userPosts: [
          ...state.userPosts,
          {id: 3, message: action.textPost.newPostText, likesCount: 0}
        ]
      }
    case 'DELETE_POST':
      return {
        ...state,
        userPosts: state.userPosts.filter(post => post.id !== action.postId)
      }
    case 'SET_STATUS': 
      return {
        ...state,
        userStatus: action.userStatus
      }
    case 'SAVE_AVATAR_IMG_SUCCESS':
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          photos: action.img
        }
      }
    case 'SET_USER_CONTACTS':
      return {
        ...state,
        userInfo: {
          ...action.formData,
          contacts: action.formData.contacts
        }
      }
    default:
      return state
  }
}

type addPostACType = {
  type: typeof ADD_POST
  textPost: string
}
export let addPostAC = (textPost: string): addPostACType => ({
  type: ADD_POST,
  textPost
})

type deletePostACType = {
  type: typeof DELETE_POST
  postId: number
}
export let deletePostAC = (postId: number): deletePostACType => ({
  type: DELETE_POST,
  postId
})

type setProfileACType = {
  type: typeof SET_PROFILE
  userInfo: userInfoType
}
export let setProfileAC = (userInfo: userInfoType): setProfileACType => ({
  type: SET_PROFILE,
  userInfo
})

type setStatusACType = {
  type: typeof SET_STATUS
  userStatus: string
}
export let setStatusAC = (userStatus: string): setStatusACType => ({
  type: SET_STATUS,
  userStatus
})

type saveAvatarImgSuccessACType = {
  type: typeof SAVE_AVATAR_IMG_SUCCESS
  img: userInfoPhotosType
}
export let saveAvatarImgSuccessAC = (img: userInfoPhotosType): saveAvatarImgSuccessACType => ({
  type: SAVE_AVATAR_IMG_SUCCESS,
  img
})

type setUserContactsACType = {
  type: typeof SET_USER_CONTACTS
  formData: userInfoType
}
export let setUserContactsAC = (formData: userInfoType): setUserContactsACType => ({
  type: SET_USER_CONTACTS,
  formData
})

export let getProfileTC = (userId) => {
  return (dispatch) => {
    usersAPI.getProfile(userId).then((response) => {
      dispatch(setProfileAC(response))    
    })
  }
}

export let getStatusTC = (userId) => {
  return (dispatch) => {
    userProfileAPI.getStatus(userId).then((response) => {
      dispatch(setStatusAC(response))
    })
  }
}

export let updateStatusTC = (status) => {
  return (dispatch) => {
    userProfileAPI.updateStatus(status).then(() => {
      dispatch(setStatusAC(status))
    })
  }
}

export let saveAvatarImgTC = (img) => async (dispatch) => {
    let response = await userProfileAPI.saveAvatarImg(img)

    if(response.data.resultCode === 0) {
      dispatch(saveAvatarImgSuccessAC(response.data.data.photos))
    }
  }

export let saveUserContactsTC = (formData) => async (dispatch) => {
  const response = await userProfileAPI.saveProfile(formData)

  if (response.data.resultCode === 0) {
    dispatch(setUserContactsAC(formData))
  } else {
    dispatch(stopSubmit("UserContacts", {_error: 'lol'})) 
  }
}


export default profileReducer