import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hook/useAuth'
import LoadingSpinner from '../Components/LoadingSpinner'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return  <LoadingSpinner/>
  if (user) return children
  return <Navigate to='/sign-in' state={{ from: location }} replace='true' />
}

PrivateRoute.propTypes = {
  children: PropTypes.element,
}

export default PrivateRoute
