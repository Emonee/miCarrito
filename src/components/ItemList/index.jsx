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
  const setNewFilter = (newfilter) =>
    setItemFilter(prev => prev === +newfilter ? FILTER_TYPES.NONE : newfilter)
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
  const activeButtonColors = (filterType) => filterType === itemFilter ? 'bg-red-900 text-slate-100' : ''
  return <>
    {itemList}
    <div className='w-full flex gap-4 mt-3'>
      <button
        onClick={() => setNewFilter(FILTER_TYPES.LESS_THAN_ZERO)}
        className={`flex-1 rounded-md border-2 border-slate-100 ${activeButtonColors(FILTER_TYPES.LESS_THAN_ZERO)}`}
      >&lt;</button>

      <button
        onClick={() => setNewFilter(FILTER_TYPES.IS_ZERO)}
        className={`flex-1 rounded-md border-2 border-slate-100 ${activeButtonColors(FILTER_TYPES.IS_ZERO)}`}
      >0</button>

      <button
        onClick={() => setNewFilter(FILTER_TYPES.MORE_THAN_ZERO)}
        className={`flex-1 rounded-md border-2 border-slate-100 ${activeButtonColors(FILTER_TYPES.MORE_THAN_ZERO)}`}
      >&gt;</button>
    </div>
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