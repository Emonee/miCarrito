import { db } from "../../db"
import { alertErrorMessage } from "../../helpers/errorHandlers"
import { NO_CATEGORY_SELECTED_VALUE } from "../../App"

export default function EditCategoryDialog({ categorySelected, setCategorySelected }) {
  const removeCategory = async () => {
    if (categorySelected === NO_CATEGORY_SELECTED_VALUE) return alert('Select a Category to remove it')
    try {
      const { name: categorySelectedName } = await db.categories.get(categorySelected)
      if (!confirm(`Are you sure you want to delete the category: "${categorySelectedName}"`)) return
      await Promise.all([removeCategoryFromDB(categorySelected), removeCategoryFromItems(categorySelected)])
      setCategorySelected(NO_CATEGORY_SELECTED_VALUE)
    } catch (err) {
      alertErrorMessage(err)
    }
  }

  return (
    <button onClick={removeCategory}>DEL</button>
  )
}

function removeCategoryFromDB(categoryId) {
  return db.categories.delete(categoryId)
}

function removeCategoryFromItems(categoryId) {
  return db.items.where('categories').equals(categoryId).modify(item => {
    item.categories = item.categories.filter(category => category !== categoryId)
  })
}
