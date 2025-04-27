import Cart from './Cart'
import Container from '../../Components/Container/Container'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../Components/LoadingSpinner'
import axios from 'axios'
const Plant = () => {
    const {data: plants, isLoading } = useQuery({
        queryKey: ['plants'],
        queryFn: async () =>{
            const {data} = await  axios.get('http://localhost:5000/plants')
            return data;
        }
      })  

      
  if (isLoading) return <LoadingSpinner />
  return (
    <Container>
      {plants && plants.length > 0 ? (
        <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {plants.map(plant => (
            <Cart key={plant._id} plant={plant} />
          ))}
        </div>
      ) : (
        <p>No Data Available</p>
      )}
    </Container>
  )
}

export default Plant;
