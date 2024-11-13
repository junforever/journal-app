import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { ImageGallery } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { useEffect, useMemo, useRef } from 'react'
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal'
import { useDebounceFunc } from '../../hooks'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {
  const debouncedSetActiveNode = useDebounceFunc(( sliderReducer ) => {
    dispatch( sliderReducer )
  }, 600)
  const dispatch = useDispatch()
  const { active: activeNote, isSaving, messageSaved } = useSelector( state => state.journal )
  const { body, title, date, onInputChange, formState } = useForm( activeNote )

  const dateString = useMemo(() => {
    const newDate = new Date( date )
    return newDate.toUTCString()
  }, [date] )

  const fileInputRef = useRef()

  useEffect( () => {
    // dispatch( setActiveNote( formState ) )
    debouncedSetActiveNode( setActiveNote( formState ) )

  }, [formState])

  useEffect( () => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success')
    }

  }, [messageSaved])

  const onSaveNote = () => {
    dispatch( startSaveNote() )
  }

  const onFileinputChange = ({ target }) => {
    if( target.files.length === 0 ) return

    dispatch( startUploadingFiles( target.files ) )
  }

  const onDelete = () => {
    dispatch( startDeletingNote() )
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      sx={{
        mb: 1
      }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Grid item>
        <Typography fontSize={ 39 } fontWeight="light">
          { dateString }
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          multiple
          onChange={ onFileinputChange }
          style={{
            display: 'none'
          }}
          ref={ fileInputRef }
        />

        <IconButton
          color="primary"
          disabled={ isSaving }
          onClick={ ()=> fileInputRef.current.click() }
        >
          <UploadOutlined />
        </IconButton>

        <Button
          color="primary"
          sx={{ padding: 2}}
          onClick={ onSaveNote }
          disabled={ isSaving }
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese el título"
          label="Titulo"
          sx={{ border: 'none', mb:1 }}
          value={ title }
          onChange={ onInputChange }
          name="title"
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="Que sucedió hoy?"
          minRows={ 5 }
          value={ body }
          onChange={ onInputChange }
          name="body"
        />
      </Grid>
      <Grid
        container
        justifyContent="end"
      >
        <Button
          onClick={ onDelete }
          sx={{ mt:2 }}
          color="error"
        >
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      <ImageGallery
        images={ activeNote.imageUrls }
      />

    </Grid>
  )
}