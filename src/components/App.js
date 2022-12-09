import React, { useMemo, useState } from 'react'
import './App.css'
import Item from './Item'
import generateProducts from '../utils/generateProducts.js'
import PriceFilter from './PriceFilter'
import ColorFilter from './ColorFilter'

const SORTINGS = {
  'Сначала дешевые': (a, b) => a.price - b.price,
  'Сначала дорогие': (a, b) => b.price - a.price,
  'Сначала популярные': (a, b) => b.rating - a.rating,
}

const FILTERS = {
  includes: (list, field) => (o) => list.includes(o[field]),
  range: (min, max, field) => (o) => o[field] >= min && o[field] <= max,
  search: (value, field) => (o) =>
    o[field].toLowerString().contains(value.toLowerString()),
}

function App() {
  const [filterConfig, setFilterConfig] = useState({})
  const [sortFn, setSortFn] = useState(() => SORTINGS['Сначала дешевые'])
  const [allProducts] = useState(() => generateProducts(30))
  const products = useMemo(() => {
    return allProducts
      .filter((p) => Object.values(filterConfig).every((fn) => fn(p)))
      .sort(sortFn)
  }, [allProducts, filterConfig, sortFn])

  const [value, setValue] = useState('')

  //SEARCH

  const handleSearchProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(value.toLowerCase())
  })
  const total = handleSearchProducts.length

  //COLOR FILTER (-)
  const arrColors = useMemo(() => {
    let tmp = new Set()
    products.map((el) => tmp.add(el.color))

    return [...tmp]
  }, [])

  const handleColorFilterChange = (colors) => {
    setFilterConfig({
      ...filterConfig,
      color: FILTERS.includes(colors, 'color'),
    })
  }

  // // PRICE FILTER

  const handlePriceFilterChange = (min, max) => {
    setFilterConfig({
      ...filterConfig,
      price: FILTERS.range(min, max, 'price'),
    })
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setProducts(
  //       products.filter(
  //         (product) => product.price >= min && product.price <= max
  //       )
  //     )
  //   }, 1000)
  // }, [min, max])

  return (
    <div className="container">
      <h1>Lamoda</h1>
      <form className="search-form">
        <input
          className="search-input"
          type="text"
          placeholder="Поиск"
          onChange={(e) => setValue(e.target.value)}
        />
      </form>

      <div className="sorts">
        {Object.keys(SORTINGS).map((name, i) => (
          <button
            key={i}
            onClick={() => setSortFn(() => SORTINGS[name])}
            // style={{ background: sortFn === SORTINGS[name] ? 'red' : 'white' }}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="containerForFiltAndProduct">
        <div className="containerForFiltAndCoint">
          <div className="count">Всего продуктов: {total}</div>

          <div className="filter">
            <p>По цвету:</p>
            <ColorFilter
              options={arrColors}
              onSelect={handleColorFilterChange}
            />
          </div>

          <div className="filter">
            <p>По цене:</p>

            <PriceFilter onChange={handlePriceFilterChange} />
          </div>
        </div>

        <div className="products">
          {handleSearchProducts.map((product) => (
            <Item
              key={product.id}
              image={product.image}
              id={product.id}
              name={product.name}
              desc={product.desc}
              color={product.color}
              price={product.price}
              rating={product.rating}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default React.memo(App)
