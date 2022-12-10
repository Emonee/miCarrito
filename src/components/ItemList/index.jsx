import { useLiveQuery } from "dexie-react-hooks"
import Item from '../Item'
import { db } from "../../db"
import { FILTER_TYPES } from "../../App"

export default function ItemList({ itemFilter }) {
  const items = useLiveQuery(
    getQueryFunctionByFilter(itemFilter),
    [ itemFilter ]
  )
  const allItemsListComponents = items?.map((item) =>
    <Item key={item.id} item={item} />
  )  

  return (
    <div className='w-11/12 mx-auto overflow-auto flex flex-col-reverse'>
      {allItemsListComponents}
    </div>      
  )
}

function getQueryFunctionByFilter(itemFilter) {
  const rightQuery = {
    [FILTER_TYPES.LESS_THAN_ZERO]: () => db.items.where('count').below(0).toArray(),
    [FILTER_TYPES.MORE_THAN_ZERO]: () => db.items.where('count').above(0).toArray(),
    [FILTER_TYPES.IS_ZERO]: () => db.items.where('count').equals(0).toArray()
  }
  const defaultQuery = () => db.items.toArray()
  return rightQuery[itemFilter] || defaultQuery
}
