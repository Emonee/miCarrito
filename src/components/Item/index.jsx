export default function Item({ item: { itemName, itemCount }, changeItemCountTo, removeItem }) {
  return (
    <div className="flex justify-start items-center">
      <button className="rounded-md bg-red-600 font-bold p-2" onClick={() => removeItem(itemName)}>Remove</button>
      <p>{itemName}</p>
      <div className="flex justify-start items-center bg-orange-600 rounded-md font-bold">
        <button className="w-7 h-7" onClick={() => changeItemCountTo(itemName, itemCount - 1)}>-</button>
        <p className="mx-2">{itemCount}</p>
        <button className="w-7 h-7" onClick={() => changeItemCountTo(itemName, itemCount + 1)}>+</button>
      </div>
    </div>
  )
}
