import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import useRole from '../hook/useRole'
import LoadingSpinner from '../Components/LoadingSpinner';

const SellerRoute = ({ children }) => {
    const { role, isLoading } = useRole();
    if (isLoading) return <LoadingSpinner />
    if (role === 'seller') return children
    return <Navigate to='/dashboard'  replace='true' />
}

SellerRoute.propTypes = {
    children: PropTypes.element,
}

export default SellerRoute
