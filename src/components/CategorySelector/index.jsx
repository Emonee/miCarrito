import { useLiveQuery } from "dexie-react-hooks"
import SelectCategoryButton from "../SelectCategoryButton"
import CategoryControls from '../CategoryControls'
import { db } from "../../db"

export default function CategorySelector({ categorySelected, setCategorySelected }) {
  const categories = useLiveQuery(() => db.categories.toArray())
  const categoriesComponentList = categories?.map(category =>
    <SelectCategoryButton key={category.id} category={category} selected={category.id === categorySelected} setCategorySelected={setCategorySelected} />)
  return (
    <div className="w-11/12 mb-auto mx-auto pb-3">
      <div className="flex gap-2 overflow-auto">
        { categoriesComponentList }
      </div>
      <CategoryControls categorySelected={categorySelected} setCategorySelected={setCategorySelected} />
    </div>
  )
}
