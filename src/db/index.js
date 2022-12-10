import Dexie from 'dexie'
import { alertErrorMessage } from '../helpers/errorHandlers'

export const db = new Dexie('myDatabase')
db.version(1)
  .stores({
    categories: '++id, &name',
    items: '++id, &name, count, *categories'
  })
  .upgrade(() => {
    console.log('hello! updgrade');
  })

db.on('ready', () => {
  if (db.verno > 1) return
  const oldItemsName = []
  for (let index = 0; index < localStorage.length; index++) {
    const name = localStorage.key(index)
    const count = +localStorage.getItem(name) || 0
    oldItemsName.push({ name, count })
  }
  for (const { name } of oldItemsName) localStorage.removeItem(name)
  db.items.bulkAdd(oldItemsName)
    .catch(alertErrorMessage)
})