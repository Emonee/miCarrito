import { db } from "../../db"
import { alertErrorMessage } from "../../helpers/errorHandlers"

export default function AddNewCategoryDialog() {
  const addNewCategory = () => {
    const categoryName = prompt('What name will your category have?')
    if (!categoryName) return
    insertCategory(categoryName)
  }
  return (
    <button onClick={addNewCategory}>ADD</button>
  )
}

function insertCategory(name) {
  db.categories.add({ name })
    .catch(alertErrorMessage)
}