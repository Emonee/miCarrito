export default function Item({ item: { itemName, itemCount }, changeItemCountTo, removeItem }) {
  return (
    <div>
      <button onClick={() => changeItemCountTo(itemName, itemCount - 1)}>-</button>
      <p>{itemName}: {itemCount}</p>
      <button onClick={() => changeItemCountTo(itemName, itemCount + 1)}>+</button>
      <button onClick={() => removeItem(itemName)}>Remove</button>
    </div>
  )
}
