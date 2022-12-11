import { db }  from '../db'
import { alertErrorMessage } from '../helpers/errorHandlers'
import { FILTER_TYPES, NO_CATEGORY_SELECTED_VALUE } from "../App"

export async function addItem({ itemName, itemCategory }) {
  const categories = itemCategory === NO_CATEGORY_SELECTED_VALUE ? [] : [ +itemCategory ]
  const newItemProps = {
    name: itemName,
    count: 0,
    categories
  }
  return await db.items.add(newItemProps)
}

export async function removeCategoryFromItems(categoryId) {
  return await db.items.where('categories').equals(categoryId).modify(item => {
    item.categories = item.categories.filter(category => category !== categoryId)
  })
}

export async function updateItemCountById({ id, newCount }) {
  return await db.items.update(id, { count: newCount })
}

export async function deleteItemById({ id }) {
  return await db.items.delete(id)
}

export function getQueryFunctionByFilter(itemFilter, categorySelected) {
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

export function removeAllVisibleItems(itemFilter, categorySelected) {
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

export function setAllVisibleItemsToZero(itemFilter, categorySelected) {
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
