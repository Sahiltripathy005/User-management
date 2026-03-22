import React from 'react'
import InputField from './InputField'

function AgeField({value , onChange , ...props}) {

    const handleAgeChange = (e) => {
    const val = e.target.value;

    if (/^\d*$/.test(val)) {
      onChange(e);
    }
  };

  return (
    <InputField
    type = 'number'
    label="Age"
    value={value}
    onChange={handleAgeChange}
    {...props}
    >
    </InputField>
  )
}

export default AgeField;