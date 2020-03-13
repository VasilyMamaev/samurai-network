import React, { Component } from 'react'
import classes from './App.module.css'
import Navbar from './components/navbar/navbar'
import News from './components/news/news'
import Music from './components/music/music'
//import Settings from './components/settings/settings'
import { Route, withRouter } from 'react-router-dom'
import ProfileContainer from './components/profile/profile-container'
import DialogsContainer from './components/dialogs/dialogs-container'
import UsersContainer from './components/users/users-container'
import HeaderContainer from './components/header/header-container'
import Login from './components/login/login'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { initializeAppTC } from './redux/app-reducer'


class App extends Component {

  componentDidMount () {
    this.props.initializeApp()
  }

  render() {
    return (
      <>
      { this.props.history.location.pathname === '/login' 
        ? <Route path="/Login" render={() => <Login />}/> 
        : <div className={classes.app_wrapper}>  
            <HeaderContainer /> 
            <Navbar />
            <div className={classes.app_wrapper_content}>
              <Route path="/Profile/:userId?" render={() => <ProfileContainer />}/>
              <Route path="/Dialogs" render={() => <DialogsContainer />}/>
              <Route path="/News" render={News}/>
              <Route path="/Music" render={Music}/>
              <Route path="/Users" render={() => <UsersContainer />}/>
            </div>
          </div>
      }   
      </>
    )
  }
}


const mapStateToProps = (state) => ({
  initialized: state.app.initalizingSuccess,
})

export default compose(
  withRouter,
  connect(mapStateToProps,{initializeApp: initializeAppTC})
  ) (App)
