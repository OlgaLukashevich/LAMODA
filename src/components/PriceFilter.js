import './Filter.css'
import { useState } from 'react'

// export default function PriceFilter(props) {
//   const handleFilter = (e) => {
//     props.onChange(e.target)
//     console.log(e.target)
//   }
export default function PriceFilter({ onChange }) {
  const [max, setMax] = useState(99999)
  const [min, setMin] = useState(0)
  const [list, setList] = useState([])

  const handleFilter = ({ target: { price } }) => {
    price >= min && price <= max
      ? list.filter((el) => el !== price)
      : [...list, price]

    onChange(setMin, setMax, setList)
  }

  return (
    <div>
      <div className="pricerange">
        <input
          type="number"
          min="0"
          max="9999"
          placeholder="от"
          id="min"
          step="100"
          onInput={handleFilter}
        />
        <input
          type="number"
          min="0"
          max="9999"
          placeholder="до"
          id="max"
          step="100"
          onInput={handleFilter}
        />
      </div>
    </div>
  )
}
