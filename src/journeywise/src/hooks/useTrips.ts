import { useState, useEffect } from 'react';
import { Trip } from '@/lib/types/trip';
import { fetchTrips } from '@/lib/api/trips';

const useTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTrips = async () => {
      setIsLoading(true);
      try {
        const fetchedTrips = await fetchTrips();
        setTrips(fetchedTrips);
      } catch (err) {
        setError('Failed to load trips. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadTrips();
  }, []);

  return { trips, isLoading, error };
};

export default useTrips;