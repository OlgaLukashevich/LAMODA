import React from 'react'
import { useState } from 'react'
import './Filter.css'
function ColorFilter({ options, onSelect }) {
  const [list, setList] = useState([])
  const handleCheck = ({ target: { name } }) => {
    const newList = list.includes(name)
      ? list.filter((el) => el !== name)
      : [...list, name]

    setList(newList)
    onSelect(newList)
  }

  return (
    <div>
      {options.map((option, i) => (
        <div className="check-color" key={i}>
          <input
            className="check"
            type="checkbox"
            name={option}
            onChange={handleCheck}
          />
          {option}
        </div>
      ))}
    </div>
  )
}
export default ColorFilter
