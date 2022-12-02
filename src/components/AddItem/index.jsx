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
    <form onSubmit={onSubmit}>
      <input ref={newNameInput} type="text" name="newItem" required/>
      <button type="submit">Add item</button>
    </form>
  </>
}
