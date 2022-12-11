import { useLiveQuery } from "dexie-react-hooks"
import Item from '../Item'
import { db } from "../../db"
import { FILTER_TYPES, NO_CATEGORY_SELECTED_VALUE } from "../../App"

export default function ItemList({ itemFilter, categorySelected }) {
  const items = useLiveQuery(
    getQueryFunctionByFilter(itemFilter, categorySelected),
    [ itemFilter, categorySelected ]
  )
  const allItemsListComponents = items?.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase())
    .map((item) => <Item key={item.id} item={item} />)  

  return (
    <div className='w-11/12 mx-auto overflow-auto flex flex-col-reverse gap-3'>
      {allItemsListComponents}
    </div>      
  )
}

function getQueryFunctionByFilter(itemFilter, categorySelected) {
  const rightQuery = {
    [FILTER_TYPES.LESS_THAN_ZERO]: () => db.items.where('count').below(0).and(filterByCategory).toArray(),
    [FILTER_TYPES.MORE_THAN_ZERO]: () => db.items.where('count').above(0).and(filterByCategory).toArray(),
    [FILTER_TYPES.IS_ZERO]: () => db.items.where('count').equals(0).and(filterByCategory).toArray()
  }
  const defaultQuery = () => categorySelected !== NO_CATEGORY_SELECTED_VALUE ?
    db.items.where('categories').equals(categorySelected).toArray() :
    db.items.toArray()

  return rightQuery[itemFilter] || defaultQuery

  function filterByCategory({ categories }) {
    return categorySelected === NO_CATEGORY_SELECTED_VALUE || categories.includes(categorySelected)
  }
}

