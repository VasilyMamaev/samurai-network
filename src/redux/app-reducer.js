import { getAuthUserDataTC } from "./auth-reducer"

const SET_INITIALIZED = 'SET_INITIALIZED'

const initialState = {
  initalizingSuccess: false
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initalizingSuccess: true
      }
    default: return state
  }
}

export const setInitializedAC = () => ({type: SET_INITIALIZED})

export const initializeAppTC = () => (dispatch) => {
  let promise = dispatch(getAuthUserDataTC())
  
  Promise.all([promise])
  .then(() => {
    dispatch(setInitializedAC())
  })
}



export default appReducer