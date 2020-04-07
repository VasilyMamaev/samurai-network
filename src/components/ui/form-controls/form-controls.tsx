import React from 'react'
import classes from './form-controls.module.css'
import { WrappedFieldProps } from 'redux-form'


export const Textarea: React.FC<WrappedFieldProps> = ({meta, input, ...props}) => {

  const hasError = meta.error

  return (
    <div className={classes.formControl + ' ' + (hasError ? classes.error : '')}>
      <textarea {...props}></textarea>
      <span>{meta.error}</span>
    </div>
  )
}

export const Input: React.FC<WrappedFieldProps> = ({meta, input, ...props}) => {

  const hasError = meta.touched && meta.error

  return (
    <div className={classes.formControl + ' ' + (hasError ? classes.error : '')}>
      <input {...props}></input><tr/>
      {hasError ? <span>{meta.error}</span> : null}
    </div>
  )
}


