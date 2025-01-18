import Navbar from './components/home/Navbar'
import HeroSection from './components/home/HeroSection'
import FeaturedGigs from './components/home/FeaturedGigs'
import RecommendedGigs from './components/home/RecommendedGigs'
import TripPlanningTools from './components/home/TripPlanningTools'

import UserTestimonials from './components/home/UserTestimonials'
import InteractiveMap from './components/home/InteractiveMap'
import CommunitySection from './components/home/CommunitySection'
import Footer from './components/home/Footer'
import DestinationSection from './components/home/DestinationSection'
import AgentRegistration from './components/home/AgentRegistration'
import PhotoGallery from './components/home/PhotoGallery'


export default function Home() {
  return (
    <main className="text-charcoal">
      <Navbar />
      <HeroSection />
      <FeaturedGigs />
      <RecommendedGigs />
      
      
      <DestinationSection />
      <TripPlanningTools />
      <AgentRegistration />
      
      
      {/* <CommunitySection /> */}
      <PhotoGallery />  
      <UserTestimonials />
      <Footer />
    </main>
  )
}

