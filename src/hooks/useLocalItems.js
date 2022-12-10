import { useReducer, useEffect } from "react"

import { FILTER_TYPES } from '../App'

function reducer(state, action) {
  const actions = {
    setInitialState: () => action.items,
    removeAllItems() {
      const { itemFilter } = action
      return (itemFilter === FILTER_TYPES.NONE) ? removeAllItems() : removeFilteredItems(itemFilter, state)
    },
    addItem() {
      localStorage.setItem(action.newItem.itemName, 0)
      return [ ...state, action.newItem ]
    },
    changeItemCountTo() {
      const { itemName, newCountValue } = action
      const itemIndex = state.findIndex(item => item.itemName === itemName)
      const newItem = { itemName, itemCount: newCountValue }
      const newState = [ ...state ]
      newState.splice(itemIndex, 1, newItem)
      localStorage.setItem(itemName, newCountValue)
      return newState
    },
    removeItem() {
      const { itemName } = action
      const itemIndex = state.findIndex(item => item.itemName === itemName)
      const newState = [ ...state ]
      newState.splice(itemIndex, 1)
      localStorage.removeItem(itemName)
      return newState
    },
    setAllItemsToZero() {
      const { itemFilter } = action
      return (itemFilter === FILTER_TYPES.NONE) ? setAllItemsToZero(state) : setToZeroByFilteredItems(itemFilter, state)
    }
  }
  return actions[action.type]()
}

export default function useLocalItems() {
  const [ state, dispatch ] = useReducer(reducer, [])
  useEffect(() => {
    const items = []
    if (localStorage.length !== 0) for (let key = 0; key < localStorage.length; key++) {
      const itemName = localStorage.key(key)
      const itemCount = +localStorage.getItem(itemName)
      items.push({ itemName, itemCount })
    }
    dispatch({type: 'setInitialState', items})
  }, [])
  return [ state, dispatch ]
}

function removeAllItems() {
  localStorage.clear()
  return []
}

function removeFilteredItems(itemFilter, state) {
  const options = {
    [FILTER_TYPES.IS_ZERO]() {
      const conditionItemNames = []
      for (let index = 0; index < localStorage.length; index++) {
        const { itemName, itemCount } = getItemByKey(index)
        if (itemCount === 0) conditionItemNames.push(itemName)
      }
      for (const itemName of conditionItemNames) localStorage.removeItem(itemName)
      return state.filter(({ itemCount }) => itemCount !== 0)
    },
    [FILTER_TYPES.LESS_THAN_ZERO]() {
      const conditionItemNames = []
      for (let index = 0; index < localStorage.length; index++) {
        const { itemName, itemCount } = getItemByKey(index)
        if (itemCount < 0) conditionItemNames.push(itemName)
      }
      for (const itemName of conditionItemNames) localStorage.removeItem(itemName)
      return state.filter(({ itemCount }) => itemCount >= 0)
    },
    [FILTER_TYPES.MORE_THAN_ZERO]() {
      const conditionItemNames = []
      for (let index = 0; index < localStorage.length; index++) {
        const { itemName, itemCount } = getItemByKey(index)
        if (itemCount > 0) conditionItemNames.push(itemName)
      }
      for (const itemName of conditionItemNames) localStorage.removeItem(itemName)
      return state.filter(({ itemCount }) => itemCount <= 0)
    }
  }
  return options[itemFilter]()
}

function setAllItemsToZero(state) {
  for (let index = 0; index < localStorage.length; index++) {
    const itemName = localStorage.key(index)
    localStorage.setItem(itemName, 0)
  }
  return state.map(({itemName}) => ({ itemName, itemCount: 0 }))
}

function setToZeroByFilteredItems(itemFilter, state) {
  const options = {
    [FILTER_TYPES.IS_ZERO]: () => state,
    [FILTER_TYPES.LESS_THAN_ZERO]() {
      const conditionalItemNames = []
      for (let index = 0; index < localStorage.length; index++) {
        const { itemName, itemCount } = getItemByKey(index)
        if(itemCount < 0) conditionalItemNames.push(itemName)
      }
      for (const itemName of conditionalItemNames) localStorage.setItem(itemName, 0)
      return state.map(item => item.itemCount < 0 ? { ...item, itemCount: 0 } : item )
    },
    [FILTER_TYPES.MORE_THAN_ZERO]() {
      const conditionalItemNames = []
      for (let index = 0; index < localStorage.length; index++) {
        const { itemName, itemCount } = getItemByKey(index)
        if(itemCount > 0) conditionalItemNames.push(itemName)
      }
      for (const itemName of conditionalItemNames) localStorage.setItem(itemName, 0)
      return state.map(item => item.itemCount > 0 ? { ...item, itemCount: 0 } : item )
    }
  }
  return options[itemFilter]()
}

function getItemByKey(key) {
  const itemName = localStorage.key(key)
  const itemCount = localStorage.getItem(itemName)
  return { itemName, itemCount }
}
