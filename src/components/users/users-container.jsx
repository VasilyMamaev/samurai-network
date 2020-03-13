import React, { Component } from 'react'
import { connect } from "react-redux";
import Users from "./users";
import { getUsersTC, toggleFollowTC } from "../../redux/users-reducer";
//import withUserAuth from '../../hoc/with-user-auth';
import { compose } from 'redux';

class UsersContainer extends Component {

  componentDidMount() {
    if (this.props.users.length === 0) {
        this.props.getUsers(this.props.usersAtPageCount, this.props.currentPage, this.props.pagePortion)
    }
  }

  onPageClick = (page, pagePortion) => {
    this.props.getUsers(this.props.usersAtPageCount, page, pagePortion)
  }

  render () {
   return(
    <Users
      users={this.props.users}
      totalCount={this.props.totalCount}
      usersAtPageCount={this.props.usersAtPageCount}
      currentPage={this.props.currentPage}
      onPageClick={this.onPageClick}
      isFetching={this.props.isFetching}
      followHandler={this.props.followHandler}
      followInProgress={this.props.followInProgress}
      pagePortion={this.props.pagePortion}
    />
   ) 
  }
}

let mapStateToProps = (state) => {
 return {
  users: state.users.users,
  totalCount: state.users.totalCount,
  usersAtPageCount: state.users.usersAtPageCount,
  currentPage: state.users.currentPage,
  pagePortion: state.users.currentPagePortion,
  isFetching: state.users.isFetching,
  followInProgress: state.users.followInProgress
 }
}


export default compose(
  connect(mapStateToProps, {followHandler: toggleFollowTC, getUsers: getUsersTC}),
  //withUserAuth
) (UsersContainer)
