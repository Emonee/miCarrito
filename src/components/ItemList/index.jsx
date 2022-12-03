import { useState } from 'react'
import Item from '../Item'

const FILTER_TYPES = {
  NONE: 0,
  IS_ZERO: 1,
  MORE_THAN_ZERO: 2,
  LESS_THAN_ZERO: 3
}

export default function ItemList({ items, changeItemCountTo, removeItem }) {
  const [ itemFilter, setItemFilter ] = useState(FILTER_TYPES.NONE)
  const setNewFilter = (event) => {
    setItemFilter(+event.target.value)
  }
  const allItemsListComponents = items.map(item =>
    <Item
      key={item.itemName}
      item={item}
      changeItemCountTo={changeItemCountTo}
      removeItem={removeItem}
    >
      {item}
    </Item>)
  const itemList = filterItems(allItemsListComponents, itemFilter)
  return <>
    {itemList}
    <label className='mx-auto'>
      <p>Filtro:</p>
      <select onChange={setNewFilter} value={itemFilter} className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
        <option value="0">Sin filtro</option>
        <option value="1">Es cero</option>
        <option value="2">Mayor a cero</option>
        <option value="3">Menor a cero</option>
      </select>
    </label>
  </>
}

function filterItems(itemsListComponents, itemFilter) {
  const filterOptions = {
    [FILTER_TYPES.NONE]: itemsListComponents,
    [FILTER_TYPES.IS_ZERO]: itemsListComponents.filter(({props: { item: { itemCount } }}) => itemCount === 0),
    [FILTER_TYPES.MORE_THAN_ZERO]: itemsListComponents.filter(({props: { item: { itemCount } }}) => itemCount > 0),
    [FILTER_TYPES.LESS_THAN_ZERO]: itemsListComponents.filter(({props: { item: { itemCount } }}) => itemCount < 0)
  }
  return filterOptions[itemFilter]
}