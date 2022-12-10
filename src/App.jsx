import { useState } from 'react'
import ItemList from './components/ItemList'
import CreateItemDialog from './components/CreateItemDialog'
import FilterSeters from './components/FilterSeters'
import MainOperationsButtons from './components/MainOperationsButtons'

export const FILTER_TYPES = {
  NONE: 0,
  IS_ZERO: 1,
  MORE_THAN_ZERO: 2,
  LESS_THAN_ZERO: 3
}

export default function App() {
  const [ itemFilter, setItemFilter ] = useState(FILTER_TYPES.NONE)  

  return (
    <div className='mx-auto max-w-2xl h-screen flex flex-col justify-end p-3'>
      <ItemList itemFilter={itemFilter} />
      <FilterSeters itemFilter={itemFilter} setItemFilter={setItemFilter} />
      <MainOperationsButtons itemFilter={itemFilter} />
      <CreateItemDialog />
    </div>
  )
}
