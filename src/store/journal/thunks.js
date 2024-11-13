import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase'
import { addNewEmptyNote, setActiveNote, saveNewNote, setPhotosToActiveNote, setNotes, setSaving, updatedNote, deleteNoteById } from './journalSlice'
import { fileUpload } from '../../journal/helpers'

export const startNewNote = () => {
  return async( dispatch, getState ) => {

    try {
      dispatch( saveNewNote() )
      const { uid } = getState().auth

      const newNote = {
        title: '',
        body: '',
        date: new Date().getTime()
      }

      const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ))
      await setDoc( newDoc, newNote )
      newNote.id = newDoc.id
      dispatch( addNewEmptyNote( newNote ) )
      dispatch( setActiveNote( newNote ) )
    } catch (error) {
      throw new Error( error )
    }


  }
}

export const startLoadingNotes = () => {
  return async( dispatch, getState ) => {
    try {
      const { uid } = getState().auth
      const collectionRef = collection( FirebaseDB, `${uid}/journal/notes` )
      const docs = await getDocs( collectionRef )
      const notes = []

      docs.forEach(doc => {
        notes.push({ id: doc.id, ...doc.data() })
      });

      dispatch( setNotes( notes ) )
    } catch (error) {
      throw new Error( error )
    }

  }
}

export const startSaveNote = () => {
  return async( dispatch, getState ) => {
    try {
      dispatch ( setSaving() )

      const { uid } = getState().auth
      const { active: activeNote } = getState().journal

      const noteToFirebase = { ...activeNote }
      delete noteToFirebase.id

      const docRef = doc( FirebaseDB, `${uid}/journal/notes/${activeNote.id}`)
      await setDoc( docRef, noteToFirebase, { merge: true })

      dispatch( updatedNote( activeNote ) )

    } catch (error) {
      throw new Error( error )
    }

  }
}

export const startUploadingFiles = ( files = [] ) => {
  return async( dispatch ) => {
    dispatch( setSaving() )

    //await fileUpload( files[0] )
    const fileUploadPromises = []

    for (const file of files) {
      fileUploadPromises.push( fileUpload(file) )
    }

    const photosUrls = await Promise.all( fileUploadPromises )
    dispatch( setPhotosToActiveNote( photosUrls) )
  }
}

export const startDeletingNote = () => {
  return async( dispatch, getState ) => {
    try {
      const { uid } = getState().auth
      const { active: activeNote } = getState().journal
      const docRef = doc( FirebaseDB, `${uid}/journal/notes/${activeNote.id}`)
      await deleteDoc( docRef )
      dispatch( deleteNoteById( activeNote.id ) )
    } catch (error) {
      throw new Error( error )
    }

  }
}