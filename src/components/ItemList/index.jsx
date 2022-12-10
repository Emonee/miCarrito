import Item from '../Item'

import { FILTER_TYPES } from '../../App'

export default function ItemList({ items, dispatchItems, itemFilter }) {
  const changeItemCountTo = (itemName, newCountValue) => dispatchItems({
    type: 'changeItemCountTo',
    itemName,
    newCountValue
  })
  const removeItem = (itemName) => dispatchItems({
    type: 'removeItem',
    itemName
  })
  const itemList = filterItems(items, itemFilter)
  const allItemsListComponents = itemList.map(item =>
    <Item
      key={item.itemName}
      item={item}
      changeItemCountTo={changeItemCountTo}
      removeItem={removeItem}
    >
      {item}
    </Item>)
  return (
    <div className='w-11/12 mx-auto overflow-auto flex flex-col-reverse'>
      {allItemsListComponents}
    </div>      
  )
}

function filterItems(items, itemFilter) {
  const filterOptions = {
    [FILTER_TYPES.NONE]: items,
    [FILTER_TYPES.IS_ZERO]: items.filter(({ itemCount }) => itemCount === 0),
    [FILTER_TYPES.MORE_THAN_ZERO]: items.filter(({ itemCount }) => itemCount > 0),
    [FILTER_TYPES.LESS_THAN_ZERO]: items.filter(({ itemCount }) => itemCount < 0)
  }
  return filterOptions[itemFilter]
}
