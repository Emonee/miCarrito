import { useLiveQuery } from "dexie-react-hooks"
import { getQueryFunctionByFilter } from "../../db/itemOperations"
import Item from '../Item'

export default function ItemList({ itemFilter, categorySelected }) {
  const items = useLiveQuery(
    getQueryFunctionByFilter(itemFilter, categorySelected),
    [ itemFilter, categorySelected ]
  )
  const allItemsListComponents = items
    ?.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase())
    .map((item) => <Item key={item.id} item={item} />)  

  return (
    <div className='w-11/12 mx-auto overflow-auto flex flex-col-reverse gap-3'>
      {allItemsListComponents}
    </div>      
  )
}
