import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth'
import { JournalRoutes } from '../journal'
import { authTypes } from '../store/types'
import { CheckingAuth } from '../ui'
import { useCheckAuth } from '../hooks'

export const AppRouter = () => {
  const { status } = useCheckAuth()

  if (status === authTypes.check) {
    return <CheckingAuth />
  }

  return (
    //rutas protegidas
    <Routes>
      {
        (status === authTypes.auth)
          ? <Route path="/*" element={ <JournalRoutes />} />
          : <Route path="/auth/*" element={ <AuthRoutes />} />
      }

      <Route path="/*" element={ <Navigate to="/auth/login" />} />
    </Routes>

    //rutas sin proteger
    // <Routes>
    //   <Route path="/auth/*" element={ <AuthRoutes />} />
    //   <Route path="/*" element={ <JournalRoutes />} />
    // </Routes>
  )
}