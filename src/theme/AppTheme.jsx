import { ThemeProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import PropTypes from 'prop-types'
import { purpleTheme } from './'


export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={ purpleTheme }>
      <CssBaseline />
      { children }
    </ThemeProvider>
  )
}

AppTheme.propTypes = {
  children: PropTypes.node
}