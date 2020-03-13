import React from 'react'
import loadingImg from '../../../assets/ainmation/loading-cube.svg'
import classes from './loader.module.css'

function Loader() {
  return (
    <div className={classes.Loader}>
      <img src={loadingImg} alt='loading'/>
    </div>
  )
}

export default Loader
