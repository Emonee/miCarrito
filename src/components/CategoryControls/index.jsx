import EditCategoryDialog from '../EditCategoryDialog'
import AddNewCategoryDialog from "../AddNewCategoryDialog";

export default function CategoryControls({ categorySelected, setCategorySelected }) {
  return (
    <div className="flex gap-3">
      <EditCategoryDialog categorySelected={categorySelected} setCategorySelected={setCategorySelected} />
      <AddNewCategoryDialog />
    </div>
  )
}