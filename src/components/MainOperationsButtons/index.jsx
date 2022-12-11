import { FILTER_TYPES } from "../../App"
import { removeAllVisibleItems, setAllVisibleItemsToZero } from "../../db/itemOperations"

export default function MainOperationsButtons({ itemFilter, categorySelected }) {
  const confirmDeleteAllMessage = 'Are you sure you want to remove all visible items?'
  const confirmSetAllZeroMessage = 'Are you sure you want to set all visible items values to zero?'
  const clearAll = () => confirm(confirmDeleteAllMessage) && removeAllVisibleItems(itemFilter, categorySelected)
  const setAllItemsToZero = () => itemFilter !== FILTER_TYPES.IS_ZERO && confirm(confirmSetAllZeroMessage) && setAllVisibleItemsToZero(itemFilter, categorySelected)
  return (
    <div className='w-11/12 flex justify-start items-center mx-auto gap-2 mb-2'>
      <button className='flex-1 bg-emerald-900 font-bold p-2 rounded-md self-stretch' onClick={clearAll}>Clear all</button>
      <button className='flex-1 bg-emerald-900 font-bold p-2 rounded-md self-stretch' onClick={setAllItemsToZero}>Set all to 0</button>
    </div>
  )
}
