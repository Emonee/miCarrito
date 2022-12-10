import { db } from "../../db";
import TrashIcon from "../../svgIconComponents/TrashIcon"
import { alertErrorMessage } from "../../helpers/errorHandlers"


export default function Item({ item: { id, name, count } }) {
  const updateItemCount = (newCount) => updateItemCountById({ id, newCount })
  const deleteItem = () => deleteItemById({ id })

  return (
    <div className="flex justify-start items-center w-full gap-7 mt-4">
      <button onClick={deleteItem}><TrashIcon className="w-7 fill-red-600" /></button>
      <p className="text-lg">{name}</p>
      <div className="flex justify-start items-center bg-orange-600 rounded-md font-bold ml-auto">
        <button className="w-7 h-7" onClick={() => updateItemCount(count - 1)}>-</button>
        <p className="w-10 text-center">{count}</p>
        <button className="w-7 h-7" onClick={() => updateItemCount(count + 1)}>+</button>
      </div>
    </div>
  )
}

function updateItemCountById({ id, newCount }) {
  db.items.update(id, { count: newCount })
    .catch(alertErrorMessage)
}

function deleteItemById({ id }) {
  db.items.delete(id)
    .catch(alertErrorMessage)
}
