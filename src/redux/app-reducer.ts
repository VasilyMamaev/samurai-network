import { getAuthUserDataTC } from "./auth-reducer"
import { ThunkAction } from "redux-thunk"
import { AppStateType } from "./redux-store"

const SET_INITIALIZED = 'SET_INITIALIZED'

export type stateType = {
  initalizingSuccess: boolean
}

const initialState: stateType = {
  initalizingSuccess: false
}

const appReducer = (state = initialState, action: setInitializedACType): stateType => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initalizingSuccess: true
      }
    default: return state
  }
}

type setInitializedACType = {
  type: typeof SET_INITIALIZED
}
export const setInitializedAC = (): setInitializedACType => ({type: SET_INITIALIZED})

export const initializeAppTC = (): ThunkAction<void, AppStateType, unknown, setInitializedACType> => (dispatch) => {
  let promise = dispatch(getAuthUserDataTC())
  
  Promise.all([promise])
  .then(() => {
    dispatch(setInitializedAC())
  })
}



export default appReducer