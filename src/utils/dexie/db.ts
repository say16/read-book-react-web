import Dexie from 'dexie'

const db = new Dexie('pdfFilesDB')
db.version(1).stores({
  pdfFiles: '++id, file'
})

export default db
