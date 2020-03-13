import profileReducer, { addPostActionCreator, deletePostAC } from "./profile-reducer"


let testState = {
  userPosts: [
    {id: 1, message: 'first post',likesCount: 9},
    {id: 2, message: 'second post',likesCount: 9},
    {id: 3, message: 'third post',likesCount: 9},
  ]
}

it('after add post length shoud be incremented', () => {
  //test data
  let action = addPostActionCreator('test')
  //action
  let newState = profileReducer(testState, action)
  //expectation
  expect(newState.userPosts.length).toBe(4)
})


it('after deletin length shoud be decremented', () => {
  //test data
  let action = deletePostAC(1)
  //action
  let newState = profileReducer(testState, action)
  //expectation
  expect(newState.userPosts.length).toBe(2)
})