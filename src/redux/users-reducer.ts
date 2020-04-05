import { AppStateType } from './redux-store';
import { userType } from './../types/types';
import { usersAPI } from "../api/api"
import { ThunkAction } from 'redux-thunk';

const FOLLOW = 'FOLLOW'
const ADD_PAGE = 'ADD_PAGE'
const CHANGE_PAGE_USERS = 'CHANGE_PAGE_USERS'
const IS_FETCHING_TOGGLER = 'IS_FETCHING_TOGGLER'
const IS_FOLLOW_TOGGLER = 'IS_FOLLOW_TOGGLER'

const initialState = {
  users: [] as Array<userType>,
  totalCount: 0,
  usersAtPageCount: 6,
  currentPage: 1,
  currentPagePortion: 1,
  isFetching: false ,
  followInProgress: [] as Array<number> // array of users id's
}

type stateType = typeof initialState

let usersReducer = (state = initialState, action: UsersActionsTypes): stateType => {
  switch (action.type) {
    case 'ADD_PAGE':
      return {
        ...state,
        currentPage: action.page,
        currentPagePortion: action.pagePortion
      }
    case 'CHANGE_PAGE_USERS':
    return {
      ...state,
      totalCount: action.totalCount,
      users: [...action.users] 
    }
    case 'IS_FETCHING_TOGGLER':
    return {
      ...state,
      isFetching: action.isFetching 
    }
    case 'IS_FOLLOW_TOGGLER':
    return {
      ...state,
      followInProgress: action.isFetching 
        ? [...state.followInProgress, action.userId]
        : [...state.followInProgress.filter(id => id !== action.userId)]
    }
    case 'FOLLOW':
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.id) {
            return {...user, followed: !user.followed}
          }
          return user
          })}
    default: 
      return state
  }
}

type UsersActionsTypes = followACType | changePageACType | changePageUsersACType | isFetchingTogglerACType | isFollowTogglerACType

type followACType = {
  type: typeof FOLLOW
  id: number
  follow: boolean
}
export const followAC = (userId: number, follow: boolean): followACType => ({
  type: FOLLOW,
  follow,
  id: userId
})

type changePageACType = {
  type: typeof ADD_PAGE
  page: number
  pagePortion: number
}
export const changePageAC = (page: number, pagePortion: number): changePageACType => ({
  type: ADD_PAGE,
  page,
  pagePortion
})

type changePageUsersACType = {
  type: typeof CHANGE_PAGE_USERS
  users: Array<userType>
  totalCount: number
}
export const changePageUsersAC = (users: Array<userType>, totalCount: number): changePageUsersACType => ({
  type: CHANGE_PAGE_USERS,
  users,
  totalCount
})

type isFetchingTogglerACType = {
  type: typeof IS_FETCHING_TOGGLER
  isFetching: boolean
}
export const isFetchingTogglerAC = (isFetching: boolean): isFetchingTogglerACType => ({type: IS_FETCHING_TOGGLER, isFetching})

type isFollowTogglerACType = {
  type: typeof IS_FOLLOW_TOGGLER
  isFetching: boolean
  userId: number
}
export const isFollowTogglerAC = (isFetching: boolean, userId: number): isFollowTogglerACType => ({
  type: IS_FOLLOW_TOGGLER,
  isFetching,
  userId
})

type UsersThunkType = ThunkAction<void, AppStateType, unknown, UsersActionsTypes>

export const getUsersTC = (usersAtPageCount: number, currentPage: number, pagePortion: number): UsersThunkType => {
  return (dispatch) => {
    dispatch(isFetchingTogglerAC(true))
    dispatch(changePageAC(currentPage, pagePortion))
    usersAPI.getUsers(usersAtPageCount, currentPage).then((data: any) => {
      dispatch(changePageUsersAC(data.items, data.totalCount))
      dispatch(isFetchingTogglerAC(false))
    })
  }
}

export const toggleFollowTC = (id: number, followed: boolean): UsersThunkType => {
  return (dispatch) => {
    dispatch(isFollowTogglerAC(true, id))
    followed ? usersAPI.unfollowUser(id)
    : usersAPI.followUser(id)
    .then((resultCode: number) => {
      if (resultCode === 0) {
        dispatch(isFollowTogglerAC(false, id))
        dispatch(followAC(id, followed))
      }
    })
    
  }
}


export default usersReducer

