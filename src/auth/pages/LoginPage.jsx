import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
// import { Google } from '@mui/icons-material'
import { Link, Button, Grid, TextField, Typography, Alert } from '@mui/material'
import { AuthLayout } from '../layout'
import { useForm } from '../../hooks'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth'
import { authTypes } from '../../store/types'

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {
  const dispatch = useDispatch()
  const { status, errorMessage } = useSelector( state => state.auth )
  const { email, password, onInputChange } = useForm( formData )

  const isAuthenticating = useMemo( () => status === authTypes.check ,[status] )

  const onSubmit = ( event ) => {
    event.preventDefault()
    dispatch( startLoginWithEmailPassword({ email, password }) )
  }

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() )
  }

  return (
    <AuthLayout title="Login">
      <form
        aria-label="submit-form"
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
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={ email }
              onChange={ onInputChange }
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
              value={ password }
              inputProps={{
                'data-testid': 'Contraseña'
              }}
              onChange={ onInputChange }
            />
          </Grid>

          <Grid
            container
            //eslint-disable-next-line no-extra-boolean-cast
            display={ !!errorMessage ? '': 'none' }
            sx={{
              mt: 2
            }}
          >
            <Grid
              item
              xs={ 12 }
            >
              <Alert severity="error">{ errorMessage }</Alert>
            </Grid>
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
              sm={ 6 }
            >
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={ isAuthenticating }
              >
                Login
              </Button>
            </Grid>

            <Grid
              item
              xs={ 12 }
              sm={ 6 }
            >
              <Button
                variant="contained"
                fullWidth
                disabled={ isAuthenticating }
                onClick={ onGoogleSignIn }
                aria-label="google-btn"
              >
                {/* <Google /> */}
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>

          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={ RouterLink } color="inherit" to="/auth/register">
              Crear Cuenta
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}