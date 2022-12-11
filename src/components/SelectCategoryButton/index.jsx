import { NO_CATEGORY_SELECTED_VALUE } from "../../App"

export default function SelectCategoryButton({ setCategorySelected, category, selected }) {
  const setSelectedCategory = () => setCategorySelected(selected ? NO_CATEGORY_SELECTED_VALUE : category.id)
  const selectedClass = selected ? 'bg-red-900' : ''
  return <button
    onClick={setSelectedCategory}
    className={`text-2xl text-lime-400 border-2 border-black px-4 py-2 mb-3 rounded-md ${selectedClass}`}
  >{category.name}</button>
}