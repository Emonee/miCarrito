import useLocalItems from './hooks/useLocalItems'

import ItemList from './components/ItemList'
import CreateItemDialog from './components/CreateItemDialog'

export default function App() {
  const [ items, dispatchItems ] = useLocalItems()
  const clearAll = () => dispatchItems({ type: 'removeAllItems' })
  const addItem = (newItemName) => !localStorage.getItem(newItemName) && dispatchItems({
    type: 'addItem',
    newItem: { itemName: newItemName, itemCount: 0}
  })
  const changeItemCountTo = (itemName, newCountValue) => dispatchItems({
    type: 'changeItemCountTo',
    itemName,
    newCountValue
  })
  const removeItem = (itemName) => dispatchItems({
    type: 'removeItem',
    itemName
  })
  const setAllItemsToZero = () => dispatchItems({type: 'setAllItemsToZero'})
  return (
    <div className='mx-auto max-w-2xl h-screen flex flex-col justify-end p-3'>
      <ItemList items={items} changeItemCountTo={changeItemCountTo} removeItem={removeItem} />
      <div className='w-11/12 flex justify-start items-center mx-auto gap-2 mb-2'>
        <button className='flex-1 bg-emerald-900 font-bold p-2 rounded-md self-stretch' onClick={clearAll}>Clear all</button>
        <button className='flex-1 bg-emerald-900 font-bold p-2 rounded-md self-stretch' onClick={setAllItemsToZero}>Set all to 0</button>
      </div>
      <CreateItemDialog addItem={addItem} />
    </div>
  )
}
