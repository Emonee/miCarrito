import { useLiveQuery } from "dexie-react-hooks"
import { useState, useEffect } from "react"
import { NO_CATEGORY_SELECTED_VALUE } from "../../App"
import { db } from "../../db"

export default function SelectCategory({ inputName, categorySelected }) {
  const [ selectValue, setSelectValue ] = useState('')
  useEffect(() => {
    setSelectValue(categorySelected)
  }, [categorySelected])
  const onSelectchange = (event) => {
    setSelectValue(event.target.value)
  }
  const categories = useLiveQuery(() => db.categories.toArray())
  const options = categories?.map(({ id, name }) => <option key={id} value={id}>{name}</option>)

  return (
    <select value={selectValue} onChange={onSelectchange} className="w-full p-2 mb-5 rounded-md border-0" name={inputName}>
      <option value={NO_CATEGORY_SELECTED_VALUE}>Without category</option>
      {options}
    </select>
  )
}
