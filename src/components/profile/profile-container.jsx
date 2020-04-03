import Profile from './profile'
import { getProfileTC, getStatusTC, updateStatusTC, saveAvatarImgTC, saveUserContactsTC, addPostAC } from '../../redux/profile-reducer'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
//import withUserAuth from '../../hoc/with-user-auth'
import { compose } from 'redux'

class ProfileContainer extends Component {

  refreshProfile() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = this.props.userId
      if (!userId) {
        this.props.history.push('/login')
      }
    }
    this.props.getProfile(userId)
    this.props.getStatus(userId)
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.userId !== this.props.match.params.userId) {
      this.refreshProfile()
    }
  }

  render () {
    return (
      <Profile
        userInfo = {this.props.userInfo}
        userPosts = {this.props.userPosts}
        newPostText = {this.props.newPostText}
        textChangeHandler = {this.props.textChangeHandler}
        newPostHandler = {this.props.newPostHandler}
        userStatus = {this.props.userStatus}
        updateStatus = {this.props.updateStatus}
        iserId = {this.props.match.params.userId}
        isAuth = {this.props.isAuth}
        saveAvatarImg = {this.props.saveAvatarImg}
        updateUserContacts = {this.props.updateUserContacts}
      />
    )
  }
}

let mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    isAuth: state.auth.isAuth,
    userPosts: state.profile.userPosts,
    userInfo: state.profile.userInfo,
    newPostText: state.profile.newPostText,
    userStatus: state.profile.userStatus
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    newPostHandler: (textPost) => {
      dispatch(addPostAC(textPost))
    },
    getProfile: (userInfo) => {
      dispatch(getProfileTC(userInfo))
    },
    getStatus: (userId) => {
      dispatch(getStatusTC(userId))
    },
    updateStatus: (status) => {
      dispatch(updateStatusTC(status))
    },
    saveAvatarImg: (img) => {
      dispatch(saveAvatarImgTC(img))
    },
    updateUserContacts: (formData) => {
      dispatch(saveUserContactsTC(formData))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
 // withUserAuth
) (ProfileContainer)
