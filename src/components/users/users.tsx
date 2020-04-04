import React from 'react'
import noAvatarImg from '../../assets/images/no-avatar-img.jpg'
import classes from './users.module.css'
import User from './user/user'
import Loader from '../ui/loader/loader'
import Paginator from '../ui/paginator/paginator'
import { userType } from '../../types/types'

type PropsType = {
  users: Array<userType>
  totalCount: number
  usersAtPageCount: number
  currentPage: number
  onPageClick: (page: number, pagePortion: number) => void
  isFetching: boolean
  followHandler: (id: number, followed: boolean) => void
  followInProgress: Array<number>
  pagePortion: number
}

const Users: React.FC<PropsType> = (props) => {

  return (
    <div className={classes.Users}>
      { props.isFetching ? <Loader/> 
      : <>
      <Paginator 
        totalCount={props.totalCount}
        usersAtPageCount={props.usersAtPageCount}
        currentPage={props.currentPage}
        onPageClick={props.onPageClick}
        portionSize={6}
        pagePortion={props.pagePortion}
      />
      <div className={classes.usersList}>
        { props.users.map(user => <User 
          key={user.id}
          id={user.id}
          followHandler={props.followHandler}
          avatar={(user.photos.small !== null) ? user.photos.small : noAvatarImg }
          followed={user.followed}
          followInProgress={props.followInProgress}
          name={user.name}
          userStatus={user.status}
          city={'user.location.city'}
          country={'user.location.country'} 
          />) 
        }
      </div>
      {/* <div>
        <button onClick={() => props.addUsersHandler()}>Show more</button>
      </div> */}
      </>
      }
    </div>
  )
}

export default Users
