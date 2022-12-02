import Item from '../Item'

export default function ItemList({ items, changeItemCountTo, removeItem }) {
  const itemList = items.map(item =>
    <Item
      key={item.itemName}
      item={item}
      changeItemCountTo={changeItemCountTo}
      removeItem={removeItem}
    >
      {item}
    </Item>)
  return itemList
}