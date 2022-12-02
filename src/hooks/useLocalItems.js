import { useReducer, useEffect } from "react"

function reducer(state, action) {
  const actions = {
    setInitialState: () => action.items,
    removeAllItems: () => {
      localStorage.clear()
      return []
    },
    addItem: () => {
      localStorage.setItem(action.newItem.itemName, 0)
      return [ ...state, action.newItem ]
    },
    changeItemCountTo: () => {
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
      for (let index = 0; index < localStorage.length; index++) {
        const itemName = localStorage.key(index)
        localStorage.setItem(itemName, 0)
      }
      return state.map(({itemName}) => ({ itemName, itemCount: 0 }))
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
