const admin = require('firebase-admin')
const { getFirestore } = require('firebase-admin/firestore')
const serviceAccount = require('./back43475-2e7f8-firebase-adminsdk-pg5pc-4801215f0a.json')

/* LOG4JS */
const { log4jsConfigure } = require("../LOGGERS/log4.js")
let logger = log4jsConfigure.getLogger()
/* LOG4JS */

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = getFirestore()

const obj = {
  nombre: 'lu',
  rol: 'alumna',
  edad: 18,
}
// CRUD
// Create
async function CreateColInFireStore(toInsert) {
  try {
    const resFireStore = await db.collection('usuarios').doc('').set(toInsert)
    // logger.info("resFireStore.id: ", resFireStore);
    return resFireStore
  } catch (error) {
    logger.info('Error in CreateColInFireStore', error)
  }
}

// logger.info(CreateColInFireStore(obj))
// Read
async function readEveryOne() {
  const resFireStore = await db.collection('usuarios').get()
  logger.info('readEveryOne')
  let arrToRes = resFireStore.docs.map((docs) => {
    return { id: docs.id, ...docs.data() }
  })

  return arrToRes
}
logger.info(readEveryOne())

// Update
async function updateDocument(toUpdate) {
  const docToUpdate = db.collection('usuarios').doc(toUpdate) // Obtengo la referencia al documento
  // logger.info(docToUpdate);
  const res = await docToUpdate.update({ edad: 19 })
  return res
}
// updateDocument("0Q4JWWYT8HGPTi1Qh5Yv")
//   .then((res) => { logger.info(res); })
//   .catch((e) => { logger.info(e); })

// Delete
async function deleteDoc(toDelete) {
  const res = await db.collection('usuarios').doc(toDelete).delete()

  return res
}

// deleteDoc("KBBgV42bbZkIetAFOvLb")
//   .then((res) => { logger.info(res); })
//   .catch((e) => { logger.info(e); })
