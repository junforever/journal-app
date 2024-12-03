import { startNewNote } from '../../../src/store/journal/thunks'
import { addNewEmptyNote, saveNewNote, setActiveNote } from '../../../src/store/journal/journalSlice'
import { demoUser } from '../../fixtures/authFictures'
import { FirebaseDB } from '../../../src/firebase'
import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite'

describe('Test of Journal Thunks', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()
  const collectionRef = collection( FirebaseDB, `${demoUser.uid}/journal/notes` )
  beforeEach( () => jest.clearAllMocks() )
  test('should create a new blank note', async() => {
    getState.mockReturnValue({ auth: {uid: demoUser.uid }})
    await startNewNote()(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith( saveNewNote() )
    expect(dispatch).toHaveBeenCalledWith( addNewEmptyNote({
      body: '',
      title: '',
      id: expect.any( String ),
      date: expect.any( Number ),
    }) )
    expect(dispatch).toHaveBeenCalledWith( setActiveNote({
      body: '',
      title: '',
      id: expect.any( String ),
      date: expect.any( Number ),
    }) )

    //borrar de firebase
    const docs = await getDocs(collectionRef)
    //console.log(docs)

    const deletePromises = []
    docs.forEach( doc => deletePromises.push(deleteDoc( doc.ref )) )
    await Promise.all( deletePromises )

  })

})