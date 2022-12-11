import { db }  from '../db'

export async function insertCategory(name) {
  return await db.categories.add({ name })
}

export async function removeCategoryFromDB(categoryId) {
  return await db.categories.delete(categoryId)
}
