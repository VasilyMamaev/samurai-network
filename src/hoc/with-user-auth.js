import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

function withUserAuth(Component) {

  class RedirectComponent extends React.Component {

    render() {
      if (!this.props.isAuth) {
        return <Redirect to='/login'/>
      }

      return <Component {...this.props}/>

    }
  }

  let mapStateToPropsForRedirect = (state) => ({
    isAuth : state.auth.isAuth
  })

  let ConnectAuthRedirectComponent = connect(mapStateToPropsForRedirect) (RedirectComponent)
  
  return ConnectAuthRedirectComponent
}

export default withUserAuth
