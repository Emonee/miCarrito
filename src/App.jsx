import useLocalItems from './hooks/useLocalItems'

import AddItem from './components/AddItem'
import ItemList from './components/ItemList'

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
  return <div className='mx-auto max-w-2xl h-screen flex flex-col justify-end p-3'>
    <div className='w-3/4 mx-auto flex justify-between flex-wrap mb-5'>
      <ItemList items={items} changeItemCountTo={changeItemCountTo} removeItem={removeItem} />
    </div>
    <div className='flex justify-start items-center mx-auto w-fit gap-2 mb-2'>
      <button className='bg-emerald-900 font-bold p-2 rounded-md' onClick={clearAll}>Clear all</button>
      <button className='bg-emerald-900 font-bold p-2 rounded-md' onClick={setAllItemsToZero}>Set all items to 0</button>
    </div>
    <AddItem addItem={addItem}/>
  </div>
}
