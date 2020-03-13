import { usersAPI, userProfileAPI } from "../api/api"
import { stopSubmit } from "redux-form"

const ADD_POST = 'ADD-POST'
const DELETE_POST = 'DELETE_POST'
const SET_PROFILE = 'SET_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SAVE_AVATAR_IMG_SUCCESS = 'SAVE_AVATAR_IMG_SUCCESS'
const SET_USER_CONTACTS = 'SET_USER_CONTACTS'

const initialState = {
  userInfo: null,
  userPosts: [
    {id: 1, message: 'Шёл сегодня с работы домой, на улице темнотища, иду с фонариком. Смотрю, впереди на снегу необычные образования. Пригляделся - следы :) По свежевыпавшему пушистому снегу прошлись, а потом ветер выдул весь снег, оставив только спрессованные ногами следы от ботинок. Впервые такое вижу.',likesCount: 99},
    {id: 2, message: 'Как-то стороной обходили Поль Бейкери, а оказывается там весьма неплохо.',likesCount: 9}
  ],
  userStatus: ''
}


let profileReducer = (state = initialState, action) => {
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
          {id: 3, message: action.textPost.newPostText}
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


export let addPostActionCreator = (textPost) => ({
  type: ADD_POST,
  textPost
})
export let deletePostAC = (postId) => ({
  type: DELETE_POST,
  postId
})
export let setProfileActionCreator = (userInfo) => ({
  type: SET_PROFILE,
  userInfo
})
export let setStatusAC = (userStatus) => ({
  type: SET_STATUS,
  userStatus
})
export let saveAvatarImgSuccessAC = (img) => ({
  type: SAVE_AVATAR_IMG_SUCCESS,
  img
})
export let setUserContactsAC = (formData) => ({
  type: SET_USER_CONTACTS,
  formData
})

export let getProfileTC = (userId) => {
  return (dispatch) => {
    usersAPI.getProfile(userId).then((response) => {
      dispatch(setProfileActionCreator(response))    
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