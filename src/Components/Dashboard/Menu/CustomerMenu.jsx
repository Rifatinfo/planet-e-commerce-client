import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
// import MenuItem from './MenuItem'
import { useState } from 'react'
import BecomeSellerModal from '../../Modal/BecomeSellerModal'
import MenuItem from './MenuItem'
import useAxiosSecure from '../../../hook/useAxiosSecure'
import useAuth from '../../../hook/useAuth'
// import useRole from '../../../hook/useRole'
// import { Navigate } from 'react-router-dom'
const CustomerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const closeModal = () => {
    setIsOpen(false)
  }
  // const [role] = useRole()
  const handleRequest = async () =>{
     try{
      // send a request to server 
     const {data} = await axiosSecure.patch(`/users/${user?.email}`);
     console.log(data);
     alert("successfully apply to become a seller");
     }catch(err){
      // console.log(err.response.data);
      alert(err.message);
     }finally{
      closeModal();
     }
  }
//  if(role === 'customer') return <Navigate to="/dashboard/my-orders"></Navigate>
  return (
    <>
      <MenuItem icon={BsFingerprint} label='My Orders' address='my-orders' />

      <div
        onClick={() => setIsOpen(true)}
        className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'
      >
        <GrUserAdmin className='w-5 h-5' />

        <span className='mx-4 font-medium'>Become A Seller</span>
      </div>

      <BecomeSellerModal handleRequest={handleRequest} closeModal={closeModal} isOpen={isOpen} />
    </>
  )
}

export default CustomerMenu
