import React from 'react'
import InputField from './InputField'

function EmailField(props) {
  return (
    <InputField type = "email" name = "Email" 
    {...props}>
    </InputField>
  )
}

export default EmailField