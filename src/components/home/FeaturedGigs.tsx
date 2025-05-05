'use client'


import GigCarousel from './experiences/ExperienceCarousel'
import { useQuery } from '@tanstack/react-query'

import axios from 'axios'


export default function FeaturedGigs() {
    const {data,isFetching,isLoading} = useQuery({
      queryKey: ['home'],
      queryFn: async () => {
        const res = await axios.get('/api/experiences?limit=6&offset=0')
        if (res.status !== 200) {
          throw new Error('Network response was not ok')
        }
        return res.data
      },
      refetchOnWindowFocus: false,
    })
    
    if(isLoading || isFetching){
      return (
        <GigCarousel title="Recommended Experiences" experiences={[]} isLoading={isFetching}/>
      )
    }
    

    return <GigCarousel title="Featured Experiences" experiences={data.experiences} isLoading={isLoading} />
  
}

