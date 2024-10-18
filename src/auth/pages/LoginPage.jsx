import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Google } from '@mui/icons-material'
import { Link, Button, Grid, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout'
import { useForm } from '../../hooks'
import { checkingAuthentication, startGoogleSignIn } from '../../store/auth'
import { authTypes } from '../../store/types'


export const LoginPage = () => {
  const dispatch = useDispatch()
  const { status } = useSelector( state => state.auth )
  const { email, password, onInputChange } = useForm({
    email: 'alvaro@gmail.com',
    password: '123456'
  })

  const isAuthenticating = useMemo( () => status === authTypes.check ,[status] )

  const onSubmit = ( event ) => {
    event.preventDefault()
    console.log({ email, password })
    dispatch( checkingAuthentication() )
  }

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() )
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={ onSubmit }>
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
              onChange={ onInputChange }
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
              >
                <Google />
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