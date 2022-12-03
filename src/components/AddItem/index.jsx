import { useRef } from "react"

export default function AddItem({ addItem }) {
  const newNameInput = useRef()
  const onSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { newItem } = Object.fromEntries(formData)
    addItem(newItem)
    newNameInput.current.value = ''
  }
  return <>
    <form onSubmit={onSubmit} className="flex justify-center items-center gap-2">
      <input ref={newNameInput} className="bg-cyan-600 p-2 rounded-md border border-cyan-200 text-white font-bold" type="text" name="newItem" maxLength="20" required/>
      <button type="submit" className="bg-emerald-900 font-bold p-2 rounded-md">Add item</button>
    </form>
  </>
}
