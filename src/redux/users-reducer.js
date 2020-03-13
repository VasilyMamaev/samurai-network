import { usersAPI } from "../api/api"

const FOLLOW = 'FOLLOW'
const ADD_PAGE = 'ADD_PAGE'
const CHANGE_PAGE_USERS = 'CHANGE_PAGE_USERS'
const IS_FETCHING_TOGGLER = 'IS_FETCHING_TOGGLER'
const IS_FOLLOW_TOGGLER = 'IS_FOLLOW_TOGGLER'

const initialState = {
  users: [
    // {
    //   "name": "MakeConstNotVar",
    //   "id": 5927,
    //   "uniqueUrlName": null,
    //   "photos": {
    //     "small": null,
    //     "large": null
    //   },
    //   "status": null,
    //   "followed": false
    // }
  ],
  totalCount: 0,
  usersAtPageCount: 6,
  currentPage: 1,
  currentPagePortion: 1,
  isFetching: false,
  followInProgress: []
}

let usersReducer = (state = initialState, action) => {
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

export const followAC = (userId, follow) => ({type: FOLLOW, follow, id: userId})
export const changePageActionCreator = (page, pagePortion) => ({type: ADD_PAGE, page, pagePortion})
export const changePageUsersActionCreator = (users, totalCount) => ({type: CHANGE_PAGE_USERS, users, totalCount})
export const isFetchingTogglerAC = (isFetching) => ({type: IS_FETCHING_TOGGLER, isFetching})
export const isFollowTogglerAC = (isFetching, userId) => ({type: IS_FOLLOW_TOGGLER, isFetching, userId})

export const getUsersTC = (usersAtPageCount, currentPage, pagePortion) => {
  return (dispatch) => {
    dispatch(isFetchingTogglerAC(true))
    dispatch(changePageActionCreator(currentPage, pagePortion))
    usersAPI.getUsers(usersAtPageCount, currentPage).then((data) => {
      dispatch(changePageUsersActionCreator(data.items, data.totalCount))
      dispatch(isFetchingTogglerAC(false))
    })
  }
}

export const toggleFollowTC = (id, followed) => {
  return (dispatch) => {
    dispatch(isFollowTogglerAC(true, id))
    followed ? usersAPI.unfollowUser(id)
    : usersAPI.followUser(id)
    .then((resultCode) => {
      if (resultCode === 0) {
        dispatch(isFollowTogglerAC(false, id))
        dispatch(followAC(id, followed))
      }
    })
    
  }
}


export default usersReducer

