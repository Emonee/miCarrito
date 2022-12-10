import TrashIcon from "../../svgIconComponents/TrashIcon"

export default function Item({ item: { itemName, itemCount }, changeItemCountTo, removeItem }) {
  return (
    <div className="flex justify-start items-center w-full gap-7 mt-4">
      <button onClick={() => removeItem(itemName)}><TrashIcon className="w-7 fill-red-600" /></button>
      <p className="text-lg">{itemName}</p>
      <div className="flex justify-start items-center bg-orange-600 rounded-md font-bold ml-auto">
        <button className="w-7 h-7" onClick={() => changeItemCountTo(itemName, itemCount - 1)}>-</button>
        <p className="w-10 text-center">{itemCount}</p>
        <button className="w-7 h-7" onClick={() => changeItemCountTo(itemName, itemCount + 1)}>+</button>
      </div>
    </div>
  )
}
