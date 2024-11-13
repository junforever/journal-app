import { createSlice } from '@reduxjs/toolkit'

/*
active: {
  id: '',
  title: '',
  body: '',
  date: null,
  imageUrls: []
}
*/
export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
  },
  reducers: {
    saveNewNote: (state) => {
      state.isSaving = true
    },

    addNewEmptyNote: (state, { payload }) => {
      state.notes.push( payload )
      state.isSaving = false
    },

    setActiveNote: (state, { payload }) => {
      state.active = payload
      state.messageSaved = ''
    },

    setNotes: (state, { payload }) => {
      state.notes = payload
    },

    //se dispara cuando la nota se actualiza para indicar que se esta actualizando
    setSaving: (state) => {
      state.isSaving = true
      state.messageSaved = ''
    },

    updatedNote: (state, { payload }) => {
      state.isSaving = false
      state.notes = state.notes.map( note => {
        if(note.id !== payload.id ) return note

        return payload
      })
      state.messageSaved = `${ payload.title }, actualizada correctamente`
    },

    setPhotosToActiveNote: (state, { payload }) => {
      state.active.imageUrls = [ ...state.active.imageUrls, ...payload ]
      state.isSaving = false
    },

    clearNotesLogout: (state) => {
      state.isSaving = false,
      state.messageSaved = '',
      state.notes = [],
      state.active = null
    },

    deleteNoteById: (state, { payload }) => {
      state.active = null
      state.notes = state.notes.filter( note => note.id !== payload )
    },
  },
})

export const {
  saveNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updatedNote,
  deleteNoteById,
  setPhotosToActiveNote,
  clearNotesLogout,
} = journalSlice.actions