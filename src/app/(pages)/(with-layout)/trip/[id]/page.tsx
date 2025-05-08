"use client"

import { useState, useEffect, useRef } from "react"
import { redirect, useParams, useRouter } from "next/navigation"
import { Share2, ArrowLeft, User } from "lucide-react"
import Spinner from "@/components/ui/Spinner"
import { Toast, toast } from "@/components/ui/Toast"
import Link from "next/link"
import { Waypoint } from "@/lib/types/waypoint"

// Import the components we created
import PremiumTimeline from "@/components/my-trips/PremiumTimeline"
import WaypointCard from "@/components/my-trips/TripCard"
import TripOverview from "@/components/my-trips/TripDetails"
import ImageModal from "@/components/ui/ImageModal"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"


interface trip {
  id: string
  waypoints: Waypoint[]
  estimatedBudget: number
  numPeople: number
  currency: string
  createdAt: string
}


let startLocation;
let endLocation;


export default function TripDetail() {
  const params = useParams()
  const router = useRouter()
  

  
  const [activeWaypointIndex, setActiveWaypointIndex] = useState(0)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const waypointRefs = useRef<(HTMLDivElement | null)[]>([])
  const contentRef = useRef<HTMLDivElement>(null)
  // Create a proper reference to the timeline element
  const timelineRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  
  const fetchTrip = async() =>{
    
      try {
        let response = await axios.get(`/api/trip/${params.id}`)
        return response.data
      } catch (err){
        
        router.push('/not-found');
        
        return {trip: null, user: null}
      }   
  }     

  const {data:fetchedData,isFetching,isLoading,isError} = useQuery({
    queryKey: ['trip', params.id],
    queryFn: fetchTrip,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    

  })

  useEffect(() => {
    if (isError) {
      router.push('/not-found');
    }
  }
  , [isError])
  
useEffect(() => {
  if (!contentRef.current) return;
  
  const handleScroll = () => {
    // Use window scroll instead of contentElement scroll
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY || document.documentElement.scrollTop;
    const progress = Math.min(scrolled / scrollable, 1);
    setScrollProgress(progress);
    
    // Find which waypoint is most visible in the viewport
    const waypointElements = waypointRefs.current.filter(Boolean);
    let foundVisible = false;
    
    for (let i = 0; i < waypointElements.length; i++) {
      const waypoint = waypointElements[i];
      if (!waypoint) continue;
      
      const rect = waypoint.getBoundingClientRect();
      
      // Consider a waypoint visible if it's in the top portion of the screen
      if (rect.top >= 0 && rect.top <= window.innerHeight/2) {
        if (activeWaypointIndex !== i) {
          setActiveWaypointIndex(i);
        }
        foundVisible = true;
        break;
      }
    }
    
    // If no waypoint found in the top half, look for waypoints in the visible area
    if (!foundVisible) {
      for (let i = 0; i < waypointElements.length; i++) {
        const waypoint = waypointElements[i];
        if (!waypoint) continue;
        
        const rect = waypoint.getBoundingClientRect();
        
        // Check if waypoint is in the visible area
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          if (activeWaypointIndex !== i) {
            setActiveWaypointIndex(i);
          }
          break;
        }
      }
    }
  };
  
  // Update the event listener to use window instead of contentElement
  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, [activeWaypointIndex]);
  
  


  
  // Add a new useEffect to handle timeline scrolling when activeWaypointIndex changes
  useEffect(() => {
    if ( activeWaypointIndex === undefined) return;
    scrollTimelineToWaypoint(activeWaypointIndex);
  }, [activeWaypointIndex]);

  // Modify scrollTimelineToWaypoint to better find elements in the timeline
  
  const scrollTimelineToWaypoint = (index: number) => {
    if (!timelineRef.current || !fetchedData.trip) return;
      
    
    setTimeout(() => {
      const timeline = timelineRef.current;
      if (!timeline) return;
        
      // Find waypoint elements by the new specific class
      const waypointElements = timeline.querySelectorAll('.waypoint-container');
        
      if (waypointElements[index]) {
        const timelineHeight = timeline.clientHeight;
        const waypointElement = waypointElements[index] as HTMLElement;
        const waypointTop = waypointElement.offsetTop;
          
        // Center the waypoint in the timeline
        const scrollPosition = waypointTop - (timelineHeight / 2) + 40; // Adjusted for better centering
          
        // Smooth scroll to the waypoint
        timeline.scrollTo({
          top: Math.max(0, scrollPosition),
          behavior: 'smooth'
        });
      }
    }, 10); // Small delay to ensure DOM updates
  };
  // Scroll to waypoint when clicked in timeline
  const scrollToWaypoint = (index: number) => {
    const waypointElement = waypointRefs.current[index];
    if (!waypointElement) return;
    
    // Set active waypoint index first
    setActiveWaypointIndex(index);
    
    // Simple fixed offset calculation - use a consistent value
    const offset = 150; // Fixed offset for better positioning
    
    // Scroll the window to the selected waypoint
    window.scrollTo({
      top: waypointElement.offsetTop - offset,
      behavior: 'smooth'
    });
  };

  const openImageModal = (index: number) => {
    setActiveWaypointIndex(index);
    setIsImageModalOpen(true);
  };

  if (isLoading || isFetching) {
    return (
      
      <div>Loading...</div>
    );
  }

 
  if (fetchedData.trip) {
     startLocation = fetchedData.trip.waypoints.find(w => w.type === "start")?.name || "Start";
   endLocation = fetchedData.trip.waypoints.find(w => w.type === "end")?.name || "End";  
  }
  else{
    return; 
  }
  

  return (
    <div className="h-auto flex flex-col bg-light-gray font-sans mb-[100px] relative top-[60px]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm mb-[10px]">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={() => router.push('/my-trips')}
            className="mr-4 p-2 rounded-full hover:bg-light-gray transition-colors"
            aria-label="Back to trips"
          >
            <ArrowLeft className="w-5 h-5 text-midnight-blue" />
          </button>
          
          <div className="flex-1">
            <h1 className="text-xl font-bold text-midnight-blue truncate">
              {startLocation} to {endLocation}
            </h1>
            <p className="text-sm text-charcoal hidden sm:block">
              {new Date(fetchedData.trip.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          <div className="flex items-center">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Agent Info Card */}
          {fetchedData.user && (      
            <Link 
              href={`/agent/${fetchedData.user.id}`}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-12 h-12 sm:w-12 sm:h-12 rounded-full overflow-hidden  flex items-center justify-center border-2 border-ocean-blue/20 shadow-sm">
                {fetchedData.user.avatar ? (
                  <img 
                    src={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"} 
                    alt={fetchedData.user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-ocean-blue" />
                )}
              </div>
              <p className="font-sm text-midnight-blue group-hover:text-ocean-blue transition-colors">
                  {fetchedData.user.name}
                </p>
              </Link>
          )}
              
              
              

            <button className="p-2 text-ocean-blue hover:text-midnight-blue hover:bg-light-gray rounded-full transition-colors flex items-center gap-1">
              <Share2 className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">Share</span>
            </button>
          </div>
          </div>
        </div>
 
        
        
        {/* Progress bar */}
        <div className="h-1 bg-light-gray w-full">
          <div 
            className="h-full bg-gradient-to-r from-ocean-blue to-midnight-blue transition-all duration-300"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </header>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Timeline sidebar - fixed position instead of scrollable */}
        <div className="md:w-80 lg:w-96 bg-white border-r border-gray-200 shadow-sm hidden md:block md:sticky md:top-0 md:h-screen">
          <PremiumTimeline 
            waypoints={fetchedData.trip.waypoints}
            activeWaypointIndex={activeWaypointIndex}
            onWaypointClick={scrollToWaypoint}
            startLocation={startLocation}
            endLocation={endLocation}
            totalStops={fetchedData.trip.waypoints.length - 2}
            budget={fetchedData.trip.estimatedBudget}
            currency={fetchedData.trip.currency}
            timelineRef={timelineRef}
            scrollProgress={scrollProgress}
          />
        </div>
        
        {/* Main content - will use the main page scrollbar */}
        <div 
          ref={contentRef}
          className="flex-1 px-4 pb-8 md:pb-[150px] md:px-8 lg:px-12"
        >
          {/* fetchedData.trip overview */}
          <TripOverview 
            startLocation={startLocation}
            endLocation={endLocation}
            numPeople={fetchedData.trip.numPeople}
            budget={fetchedData.trip.estimatedBudget}
            currency={fetchedData.trip.currency}
            createdAt={fetchedData.trip.createdAt}
            scrollProgress={scrollProgress}
          />
          
          {/* Waypoint sections */}
          <div className="mt-8 space-y-[300px]">
            {fetchedData.trip.waypoints.map((waypoint: Waypoint, index:number) => (
              <div 
                key={waypoint.id}
                ref={el => waypointRefs.current[index] = el}
                className="scroll-mt-24"
              >
                <WaypointCard 
                  waypoint={waypoint}
                  index={index}
                  isActive={index === activeWaypointIndex}
                  onImageClick={() => openImageModal(index)}
                />
              </div>
            ))}
          </div>
          
          {/* fetchedData.trip complete section */}
          
        </div>
      </div>
      
      {/* Image modal */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageUrl={fetchedData.trip.waypoints[activeWaypointIndex].imageUrl || ""}
        />
      
      <Toast />
    </div>
  );
}

