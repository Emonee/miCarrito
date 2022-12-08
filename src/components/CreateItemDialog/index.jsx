import { useRef } from "react"

export default function CreateItemDialog({ addItem }) {
  const dialog = useRef()
  const itemNameInput = useRef()
  const openDialog = () => dialog.current.showModal()
  const handleSubmit = (event) => {
    const { target, nativeEvent: { submitter: { value: submitterValue } } } = event
    if (submitterValue === 'cancel') {
      itemNameInput.current.value = ''
      return
    }
    const formData = Object.fromEntries(new FormData(target))
    addItem(formData.itemName)
    itemNameInput.current.value = ''
  }
  return <>
    <dialog ref={dialog} className="rounded-md bg-emerald-900">
      <form method="dialog" onSubmit={handleSubmit}>
        <input ref={itemNameInput} type="text" name="itemName" placeholder="Nombre del item" autoFocus autoComplete="off" className="block mb-5 p-2 rounded-md" />
        <div className="flex flex-row-reverse gap-3">
          <button value='addItem' className="flex-1 bg-red-900 text-white rounded-md">Agregar item</button>
          <button value='cancel' className="flex-1 bg-red-900 text-white rounded-md">Cancelar</button>
        </div>
      </form>
    </dialog>
    <button onClick={openDialog} className="w-11/12 mx-auto font-bold text-3xl p-1 rounded-md bg-orange-600">+</button>  
  </>
}