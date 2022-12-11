import { insertCategory } from "../../db/categoryOperations"

export default function AddNewCategoryDialog({ setCategorySelected }) {
  const addNewCategory = async () => {
    const categoryName = prompt('What name will your category have?')
    if (!categoryName) return
    const newCategoryId = await insertCategory(categoryName)
    setCategorySelected(newCategoryId)
  }
  return (
    <button className="flex-1 bg-emerald-900 font-bold px-2 rounded-md" onClick={addNewCategory}>ADD</button>
  )
}
