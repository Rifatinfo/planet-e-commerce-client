
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import useRole from '../hook/useRole'
import LoadingSpinner from '../Components/LoadingSpinner';

const AdminRoute = ({ children }) => {
    const { role, isLoading } = useRole();
    if (isLoading) return <LoadingSpinner />
    if (role === 'Admin') return children;
    return <Navigate to='/dashboard'  replace='true' />
}

AdminRoute.propTypes = {
    children: PropTypes.element,
}

export default AdminRoute
