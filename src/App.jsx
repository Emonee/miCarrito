import { useState } from 'react'
import ItemList from './components/ItemList'
import CreateItemDialog from './components/CreateItemDialog'
import FilterSeters from './components/FilterSeters'
import MainOperationsButtons from './components/MainOperationsButtons'
import CategorySelector from './components/CategorySelector'

export const FILTER_TYPES = {
  NONE: 0,
  IS_ZERO: 1,
  MORE_THAN_ZERO: 2,
  LESS_THAN_ZERO: 3
}

export const NO_CATEGORY_SELECTED_VALUE = -1

export default function App() {
  const [ itemFilter, setItemFilter ] = useState(FILTER_TYPES.NONE)
  const [ categorySelected, setCategorySelected ] = useState(NO_CATEGORY_SELECTED_VALUE)

  return (
    <div className='mx-auto max-w-2xl h-screen flex flex-col justify-end p-3'>
      <CategorySelector categorySelected={categorySelected} setCategorySelected={setCategorySelected} />
      <ItemList itemFilter={itemFilter} categorySelected={categorySelected} />
      <FilterSeters itemFilter={itemFilter} setItemFilter={setItemFilter} />
      <MainOperationsButtons itemFilter={itemFilter} categorySelected={categorySelected} />
      <CreateItemDialog categorySelected={categorySelected} />
    </div>
  )
}
