import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { Fragment, useState } from 'react'
import Button from '../Dashboard/Button/Button'
import toast from 'react-hot-toast'
import useAuth from '../../hook/useAuth'
import useAxiosSecure from '../../hook/useAxiosSecure'

const PurchaseModal = ({ closeModal, isOpen, plant, refetch }) => {
  const { name, category, quantity, price , _id, seller} = plant || {}
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure( )
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);
  const [parchaseInfo, setParchaseInfo] = useState({
    customer : {
        email : user?.email,
        name : user?.displayName,
        image : user?.photoURL
    },
    plantId : _id,
    price : totalPrice,
    quantity : totalQuantity,
    seller : seller.email,
    address : '',
    status : 'Pending'
  })
  // Total Price Calculation
  const handleQuantity = value => {
    const quantityValue = Number(value); 
    if (quantityValue > quantity){
      setTotalQuantity(quantity);
      toast.error('Quantity exceeds stock!');
    }
    if (quantityValue <= 0) {
      setTotalQuantity(1);
      toast.error('Quantity not less then 1!');
    }
    setTotalQuantity(quantityValue);
    setTotalPrice(quantityValue * price);
    setParchaseInfo(prev => {
      return {...prev, 
        quantity :quantityValue,
        price : quantityValue * price
      }
    })


  }
  
  const handleParchase = async () =>{
        console.log(parchaseInfo);
    try{
       await axiosSecure.post('/order', parchaseInfo);
       // update quantity collection in decrise
       await axiosSecure.patch(`/plants/quantity/${_id}`, {quantityUpdate : totalQuantity});
       refetch();
    }
    catch (err){
      console.log(err.message); 
    }
    finally{
      closeModal();
    }
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-lg font-medium text-center leading-6 text-gray-900'
                >
                  Review Info Before Purchase
                </DialogTitle>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Plant: {name}</p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Category: {category}</p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Customer: PH</p>
                </div>

                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Price: $ {price}</p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Available Quantity: {quantity}</p>
                </div>

                <div className='space-x-2 mt-2 text-sm'>
                  <label htmlFor='quantity' className=' text-gray-600'>
                    Quantity
                  </label>
                  <input
                    min={1}
                    value={totalQuantity}
                    max={quantity} onChange={(e) => handleQuantity(e.target.value)}
                    className='p-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                    name='quantity'
                    id='quantity'
                    type='number'
                    placeholder='Available quantity'
                    required
                  />
                </div>
                <div className='space-x-2 mt-2 text-sm'>
                  <label htmlFor='quantity' className=' text-gray-600'>
                    Address
                  </label>
                  <input
                  onChange={(e) => setParchaseInfo(prev => {
                    return {...prev, address : e.target.value}
                  })}
                    className='p-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                    name='address'
                    id='address'
                    type='text'
                    placeholder='Shipping Address'
                    required
                  />
                </div>

                {/* input filed */}
                <div className='mt-3'>
                  <Button onClick={handleParchase} label={`Pay ${totalPrice}$`}></Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default PurchaseModal
