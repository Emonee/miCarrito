import { db } from "../../db"
import { FILTER_TYPES, NO_CATEGORY_SELECTED_VALUE } from "../../App"
import { alertErrorMessage } from "../../helpers/errorHandlers"

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

function removeAllVisibleItems(itemFilter, categorySelected) {
  if (itemFilter === FILTER_TYPES.NONE && categorySelected !== NO_CATEGORY_SELECTED_VALUE) return db.items
    .where('categories')
    .equals(categorySelected)
    .delete()
    .catch(alertErrorMessage)
  if (itemFilter === FILTER_TYPES.NONE && categorySelected === NO_CATEGORY_SELECTED_VALUE) return db.items
    .clear()
    .catch(alertErrorMessage)
  const queryOptions = {
    [FILTER_TYPES.IS_ZERO]: 'equals',
    [FILTER_TYPES.MORE_THAN_ZERO]: 'above',
    [FILTER_TYPES.LESS_THAN_ZERO]: 'below',
  }
  db.items
    .where('count')
    [queryOptions[itemFilter]](0)
    .and(({ categories }) => categorySelected === NO_CATEGORY_SELECTED_VALUE || categories.includes(categorySelected))
    .delete()
    .catch(alertErrorMessage)  
}

function setAllVisibleItemsToZero(itemFilter, categorySelected) {
  if (itemFilter === FILTER_TYPES.IS_ZERO) return
  const queryOptions = {
    [FILTER_TYPES.NONE]: 'notEqual',
    [FILTER_TYPES.MORE_THAN_ZERO]: 'above',
    [FILTER_TYPES.LESS_THAN_ZERO]: 'below',
  }
  db.items
    .where('count')
    [queryOptions[itemFilter]](0)
    .and(({ categories }) => categorySelected === NO_CATEGORY_SELECTED_VALUE || categories.includes(categorySelected))
    .modify({ count: 0 })
    .catch(alertErrorMessage)
}