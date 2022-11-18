import React from 'react'

const Input = ({label, labelId, value, setValue, state}) => {
  return (
    <div>
        <label htmlFor={labelId}>{label}</label>
        <input type="text" id={labelId} name={labelId} value={value} onChange={(e)=> setValue({...state, value: e.target.value})}/>
    </div>
  )
}

export default Input