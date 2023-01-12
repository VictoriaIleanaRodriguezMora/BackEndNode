const admin = require('firebase-admin')
const { getFirestore } = require('firebase-admin/firestore')
const serviceAccount = require('./back43475-2e7f8-firebase-adminsdk-pg5pc-4801215f0a.json')

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
    // console.log("resFireStore.id: ", resFireStore);
    return resFireStore
  } catch (error) {
    console.log('Error in CreateColInFireStore', error)
  }
}

// console.log(CreateColInFireStore(obj))
// Read
async function readEveryOne() {
  const resFireStore = await db.collection('usuarios').get()
  console.log('readEveryOne')
  let arrToRes = resFireStore.docs.map((docs) => {
    return { id: docs.id, ...docs.data() }
  })

  return arrToRes
}
console.log(readEveryOne())

// Update
async function updateDocument(toUpdate) {
  const docToUpdate = db.collection('usuarios').doc(toUpdate) // Obtengo la referencia al documento
  // console.log(docToUpdate);
  const res = await docToUpdate.update({ edad: 19 })
  return res
}
// updateDocument("0Q4JWWYT8HGPTi1Qh5Yv")
//   .then((res) => { console.log(res); })
//   .catch((e) => { console.log(e); })

// Delete
async function deleteDoc(toDelete) {
  const res = await db.collection('usuarios').doc(toDelete).delete()

  return res
}

// deleteDoc("KBBgV42bbZkIetAFOvLb")
//   .then((res) => { console.log(res); })
//   .catch((e) => { console.log(e); })
