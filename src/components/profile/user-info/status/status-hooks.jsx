import React, { useState, useEffect } from 'react'
import classes from './status.module.css'

const StatusHooks = (props) => {

  const [editMode, setEditMode] = useState(false)
  
  const setEditModeOn = () => {
    setEditMode(true)
  }

  const setEditModeOff = () => {
    setEditMode(false)
    props.updateStatus(status)
  }


  const [status, setStatus] = useState(props.userStatus)

  const onStatusChange = (evt) => {
    setStatus(evt.target.value)
  }


  useEffect(() => {
    setStatus(props.userStatus)
  }, [props.userStatus])


  return (
    <div className={classes.Status}>
      { props.isAuth ? 
        editMode ?
          <input 
            autoFocus={true} 
            onBlur={setEditModeOff} 
            value={status} 
            type='text'
            onChange={(evt) => {onStatusChange(evt)}}
          />
          : props.userStatus ?
            <div className={classes.loggedStatus}>
              <span onDoubleClick={setEditModeOn}>{props.userStatus}</span>
              <span className={classes.statusHint}>double click for change status</span>
            </div>
            : <span onDoubleClick={setEditModeOn}>{'double click for enter status...'}</span>
            
            
        : <span>{props.userStatus}</span>
      }
    </div>
  )
}


export default StatusHooks
