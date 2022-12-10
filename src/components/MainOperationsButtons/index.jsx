import { db } from "../../db"
import { FILTER_TYPES } from "../../App"
import { alertErrorMessage } from "../../helpers/errorHandlers"

export default function MainOperationsButtons({ itemFilter }) {
  const confirmDeleteAllMessage = 'Are you sure you want to remove all visible items?'
  const confirmSetAllZeroMessage = 'Are you sure you want to set all visible items values to zero?'
  const clearAll = () => confirm(confirmDeleteAllMessage) && removeAllVisibleItems(itemFilter)
  const setAllItemsToZero = () => confirm(confirmSetAllZeroMessage) && setAllVisibleItemsToZero(itemFilter)
  return (
    <div className='w-11/12 flex justify-start items-center mx-auto gap-2 mb-2'>
      <button className='flex-1 bg-emerald-900 font-bold p-2 rounded-md self-stretch' onClick={clearAll}>Clear all</button>
      <button className='flex-1 bg-emerald-900 font-bold p-2 rounded-md self-stretch' onClick={setAllItemsToZero}>Set all to 0</button>
    </div>
  )
}

function removeAllVisibleItems(itemFilter) {
  if (itemFilter === FILTER_TYPES.NONE) return db.items.clear()
    .catch(alertErrorMessage)
  const queryOptions = {
    [FILTER_TYPES.IS_ZERO]: 'equals',
    [FILTER_TYPES.MORE_THAN_ZERO]: 'above',
    [FILTER_TYPES.LESS_THAN_ZERO]: 'below',
  }
  db.items
    .where('count')
    [queryOptions[itemFilter]](0)
    .delete()
    .catch(alertErrorMessage)
  
}

function setAllVisibleItemsToZero(itemFilter) {
  if (itemFilter === FILTER_TYPES.IS_ZERO) return
  const queryOptions = {
    [FILTER_TYPES.NONE]: 'notEqual',
    [FILTER_TYPES.MORE_THAN_ZERO]: 'above',
    [FILTER_TYPES.LESS_THAN_ZERO]: 'below',
  }
  db.items
    .where('count')
    [queryOptions[itemFilter]](0)
    .modify({ count: 0 })
    .catch(alertErrorMessage)
}