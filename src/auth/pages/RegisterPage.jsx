import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Button, Grid, TextField, Typography, Alert } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from '../layout'
import { useForm } from '../../hooks'
import { startCreatingUserWithEmailPassword } from '../../store/auth'
import { authTypes } from '../../store/types'

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe tener una @'],
  password: [ (value) => value.length > 5, 'El password debe tener más de 6 letras' ],
  displayName: [ (value) => value.trim().length > 0, 'El nombre es obligatorio']
}

export const RegisterPage = () => {
  const [ formSubmitted, setFormSubmitted ] = useState(false)
  const { displayName, email, password,
    displayNameValid, emailValid, passwordValid,
    isFormValid, onInputChange, formState } = useForm(formData, formValidations)
  const dispatch = useDispatch()
  const { status, errorMessage } = useSelector( state => state.auth )
  const isCheckingAuthentication = useMemo( () => status === authTypes.check , [status])

  const onSubmit = ( event ) => {
    event.preventDefault()
    setFormSubmitted(true)

    if( !isFormValid) return

    dispatch( startCreatingUserWithEmailPassword(formState) )
  }

  return (
    <AuthLayout title="Crear cuenta">
      <form
        onSubmit={ onSubmit }
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid
            item
            xs={ 12 }
            sx={{ mt: 2 }}
          >
            <TextField
              label="Nombre Completo"
              type="text"
              placeholder="Tu Nombre"
              fullWidth
              name="displayName"
              onChange={ onInputChange }
              value={ displayName }
              error={ !!displayNameValid && formSubmitted }
              helperText={ formSubmitted && displayNameValid }
            />
          </Grid>

          <Grid
            item
            xs={ 12 }
            sx={{ mt: 2 }}
          >
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              onChange={ onInputChange }
              value={ email }
              error={ !!emailValid && formSubmitted }
              helperText={ formSubmitted && emailValid}
            />
          </Grid>

          <Grid
            item
            xs={ 12 }
            sx={{ mt: 2 }}
          >
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              onChange={ onInputChange }
              value={ password }
              error={ !!passwordValid && formSubmitted }
              helperText={ formSubmitted && passwordValid }
            />
          </Grid>

          <Grid
            container
            spacing={ 2 }
            sx={{
              mb:2,
              mt: 1
            }}
          >
            <Grid
              item
              xs={ 12 }
              display={ errorMessage? '': 'none' }
            >
              <Alert severity="error">{ errorMessage }</Alert>
            </Grid>
            <Grid
              item
              xs={ 12 }
            >
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={ isCheckingAuthentication }
              >
                Crear Cuenta
              </Button>
            </Grid>

          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>Ya tienes cuenta?</Typography>
            <Link component={ RouterLink } color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}