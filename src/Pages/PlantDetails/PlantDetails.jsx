
import { useState } from 'react'
import Button from '../../Components/Dashboard/Button/Button'
import Container from '../../Components/Container/Container'
import Heading from '../../Components/Heading/Heading'
import PurchaseModal from '../../Components/Modal/PurchaseModal'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../../Components/LoadingSpinner'

const PlantDetails = () => {
  const {id} = useParams();
  let [isOpen, setIsOpen] = useState(false);
  const {data: plant = {}, isLoading , refetch} = useQuery({
    queryKey: ['plants', id],
    queryFn: async () =>{
        const {data} = await  axios.get(`http://localhost:5000/plant/${id}`)
        return data;
    }
  })  
  const { name, category, quantity, price, image, _id , description, seller} = plant || {}

if (isLoading) return <LoadingSpinner />
  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <Container>
      {/* <Helmet>
        <title>Money Plant</title>
      </Helmet> */}
      <div className='mx-auto flex flex-col lg:flex-row justify-between w-full gap-12 mt-30'>
        {/* Header */}
        <div className='flex flex-col gap-6 flex-1'>
          <div>
            <div className='w-full overflow-hidden rounded-xl'>
              <img
                className='object-cover w-full'
                src={image}
                alt='header image'
              />
            </div>
          </div>
        </div>
        <div className='md:gap-10 flex-1'>
          {/* Plant Info */}
          <Heading
            title={name}
            subtitle={`Category: ${category}`}
          />
          <hr className='my-6' />
          <div
            className='
          text-lg font-light text-neutral-500'
          >
            {description}
          </div>
          <hr className='my-6' />

          <div
            className='
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              '
          >
            <div>Seller: {seller?.email}</div>

            <img
              className='rounded-full'
              height='30'
              width='30'
              alt='Avatar'
              referrerPolicy='no-referrer'
              src={seller.image}
            />
          </div>
          <hr className='my-6' />
          <div>
            <p
              className='
                gap-4 
                font-light
                text-neutral-500
              '
            >
              Quantity: {quantity} Units Left Only!
            </p>
          </div>
          <hr className='my-6' />
          <div className='flex justify-between'>
            <p className='font-bold text-3xl text-gray-500'>Price: {price}$</p>
            <div>
              <Button onClick={() => setIsOpen(true)} label={quantity > 0 ? 'Purchase' : 'Out Of Stock'} />
            </div>
          </div>
          <hr className='my-6' />

          <PurchaseModal 
          refetch={refetch}
          plant={plant} 
          closeModal={closeModal} 
          isOpen={isOpen} />
        </div>
      </div>
    </Container>
  )
}

export default PlantDetails
