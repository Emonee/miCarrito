import { useState } from 'react'

import ItemList from './components/ItemList'
import CreateItemDialog from './components/CreateItemDialog'
import FilterSeters from './components/FilterSeters'

import useLocalItems from './hooks/useLocalItems'

export const FILTER_TYPES = {
  NONE: 0,
  IS_ZERO: 1,
  MORE_THAN_ZERO: 2,
  LESS_THAN_ZERO: 3
}

export default function App() {
  const [ items, dispatchItems ] = useLocalItems()
  const [ itemFilter, setItemFilter ] = useState(FILTER_TYPES.NONE)  

  const clearAll = () => dispatchItems({ type: 'removeAllItems', itemFilter })
  const setAllItemsToZero = () => dispatchItems({ type: 'setAllItemsToZero', itemFilter })

  return (
    <div className='mx-auto max-w-2xl h-screen flex flex-col justify-end p-3'>
      <ItemList items={items} dispatchItems={dispatchItems} itemFilter={itemFilter} />
      <FilterSeters setItemFilter={setItemFilter} itemFilter={itemFilter} />
      <div className='w-11/12 flex justify-start items-center mx-auto gap-2 mb-2'>
        <button className='flex-1 bg-emerald-900 font-bold p-2 rounded-md self-stretch' onClick={clearAll}>Clear all</button>
        <button className='flex-1 bg-emerald-900 font-bold p-2 rounded-md self-stretch' onClick={setAllItemsToZero}>Set all to 0</button>
      </div>
      <CreateItemDialog dispatchItems={dispatchItems} />
    </div>
  )
}
