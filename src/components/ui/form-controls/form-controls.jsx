import React from 'react'
import classes from './form-controls.module.css'

export function Textarea({input, meta, child, ...props}) {

  const hasError = meta.error

  return (
    <div className={classes.formControl + ' ' + (hasError ? classes.error : '')}>
      <textarea {...input} {...props}></textarea>
      <span>{meta.error}</span>
    </div>
  )
}

export function Input({input, meta, child, ...props}) {

  const hasError = meta.touched && meta.error

  return (
    <div className={classes.formControl + ' ' + (hasError ? classes.error : '')}>
      <input {...input} {...props}></input><tr/>
      {hasError ? <span>{meta.error}</span> : null}
    </div>
  )
}


