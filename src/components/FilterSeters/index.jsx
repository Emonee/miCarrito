import { FILTER_TYPES } from "../../App";

export default function FilterSeters({ setItemFilter, itemFilter }) {
  const setNewFilter = (newfilter) =>
    setItemFilter(prev => prev === +newfilter ? FILTER_TYPES.NONE : newfilter)  
  const activeButtonColors = (filterType) => filterType === itemFilter ? 'bg-red-900 text-slate-100' : ''
  return (
    <div className='w-11/12 mx-auto my-2 flex gap-4'>
      <button
        onClick={() => setNewFilter(FILTER_TYPES.LESS_THAN_ZERO)}
        className={`flex-1 rounded-md border-2 border-slate-100 ${activeButtonColors(FILTER_TYPES.LESS_THAN_ZERO)}`}
      >&lt;</button>

      <button
        onClick={() => setNewFilter(FILTER_TYPES.IS_ZERO)}
        className={`flex-1 rounded-md border-2 border-slate-100 ${activeButtonColors(FILTER_TYPES.IS_ZERO)}`}
      >0</button>

      <button
        onClick={() => setNewFilter(FILTER_TYPES.MORE_THAN_ZERO)}
        className={`flex-1 rounded-md border-2 border-slate-100 ${activeButtonColors(FILTER_TYPES.MORE_THAN_ZERO)}`}
      >&gt;</button>
    </div>
  )
}
