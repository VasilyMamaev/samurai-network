import React from 'react'
import classes from './profile.module.css'
import UserInfo from './user-info/user-info'
import UserPostsReduxForm from './user-posts/user-posts-form'
import likeImg from '../../assets/images/post-like.svg'

const Profile = React.memo((props) => {
  let Posts = props.userPosts.map((post, i) => {
  return <div key={i} className={classes.userPosts}>
          <div>{ post.message }</div>
          <span><img src={likeImg} alt='like'></img>{post.likesCount}</span>
        </div>
  }).reverse()

  const postHandler = (value) => {
    props.newPostHandler(value)
  }

  return (
    <body className={classes.Profile}>
      <div>
        <UserInfo 
          userInfo={props.userInfo}
          userStatus={props.userStatus}
          updateStatus={props.updateStatus}
          iserId={props.iserId}
          isAuth={props.isAuth}
          saveAvatarImg={props.saveAvatarImg}
          updateUserContacts={props.updateUserContacts}
         />
      </div>
      <div className={classes.blueLine}></div>
      <div>
        { (!props.iserId && props.isAuth ) ? <UserPostsReduxForm onSubmit={postHandler}/> : null }
      </div>
      <div>
        { Posts }
      </div>
    </body>
  )
})

export default Profile
