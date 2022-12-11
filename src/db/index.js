import Dexie from 'dexie'

export const db = new Dexie('myDatabase')
db.version(1)
  .stores({
    categories: '++id, &name',
    items: '++id, &name, count, *categories'
  })

db.on('populate', async () => {
  const defaultCategoryNames = ['Food', 'Hygiene', 'Snacks']
  const defaultCategores = defaultCategoryNames.map(name => ({ name }))
  const [ foodCategoryId, hygieneCategoryId, snacksCategoryId ] = await db.categories.bulkAdd(defaultCategores, { allKeys: true })
  const defaultItems = [
    { name: 'Apples', count: 0, categories: [foodCategoryId] },
    { name: 'Pasta', count: 0, categories: [foodCategoryId] },
    { name: 'Soap', count: 0, categories: [hygieneCategoryId] },
    { name: 'Deodorant', count: 0, categories: [hygieneCategoryId] },
    { name: 'Chips', count: 0, categories: [snacksCategoryId] },
    { name: 'Peanuts', count: 0, categories: [snacksCategoryId] }
  ]
  await db.items.bulkAdd(defaultItems)
  const oldItems = []
  for (let index = 0; index < localStorage.length; index++) {
    const name = localStorage.key(index)
    const count = +localStorage.getItem(name)
    oldItems.push({ name, count })
  }
  for (const { name } of oldItems) localStorage.removeItem(name)
  await db.items.bulkAdd(oldItems)
})
