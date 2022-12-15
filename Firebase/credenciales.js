const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./back43475-2e7f8-firebase-adminsdk-pg5pc-4801215f0a.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = getFirestore();

const obj = {
  nombre: "Vi",
  rol: "alumna",
  edad: 18
}
async function CreateColInFireStore(toInsert) {

  const resFireStore = await db.collection('usuarios').doc().set(toInsert);

  console.log("resFireStore.id: ", resFireStore);
  return resFireStore

}

CreateColInFireStore(obj)
