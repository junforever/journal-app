import { collection, getDocs } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase'

export const loadNotes = async ( uid ) => {
  if (!uid) throw new Error(' El uid no existe')

  const collectionRef = collection( FirebaseDB, `${uid}/journal/notes` )
  const docs = await getDocs( collectionRef )
  console.log(docs)
}