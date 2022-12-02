import useLocalItems from './hooks/useLocalItems'

import AddItem from './components/AddItem'
import ItemList from './components/ItemList'

export default function App() {
  const [ items, dispatchItems ] = useLocalItems()
  const clearAll = () => dispatchItems({ type: 'removeAllItems' })
  const addItem = (newItemName) => dispatchItems({
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
  return <>
    <AddItem addItem={addItem}/>
    <button onClick={clearAll}>Clear all</button>
    <button onClick={setAllItemsToZero}>Set all items to 0</button>
    <ItemList items={items} changeItemCountTo={changeItemCountTo} removeItem={removeItem} />
  </>
}
