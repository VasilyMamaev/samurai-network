import React, { Component } from 'react'
import { connect } from "react-redux";
import Users from "./users";
import { getUsersTC, toggleFollowTC } from "../../redux/users-reducer";
import { userType } from '../../types/types';
import { appStateType } from '../../redux/redux-store';

type MapStatePropsType = {
  users: Array<userType>
  totalCount: number
  usersAtPageCount: number
  currentPage: number
  pagePortion: number
  isFetching: boolean
  followInProgress: Array<number>
}

type MapDispatchPropsType = {
  getUsers: (usersAtPageCount: number, currentPage: number, pagePortion: number) => void
  followHandler: (id: number, followed: boolean) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends Component<PropsType> {

  componentDidMount() {
    if (this.props.users.length === 0) {
        this.props.getUsers(this.props.usersAtPageCount, this.props.currentPage, this.props.pagePortion)
    }
  }

  onPageClick = (page: number, pagePortion: number) => {
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

let mapStateToProps = (state: appStateType): MapStatePropsType => {
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


export default connect<MapStatePropsType, MapDispatchPropsType, {}, appStateType>
(mapStateToProps, { followHandler: toggleFollowTC, getUsers: getUsersTC}) (UsersContainer)
