import { useState, useEffect } from 'react';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  loading: boolean;
  error: string | null;
}

interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

export const useGeolocation = (options: GeolocationOptions = {}) => {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    address: null,
    loading: true,
    error: null,
  });

  const defaultOptions: GeolocationOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 60000,
    ...options,
  };

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      // Using a free geocoding service (you might want to use Google Maps API or similar)
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch address');
      }
      
      const data = await response.json();
      
      // Format the address similar to "5 Orile Pedeoro Compound"
      const locality = data.locality || data.city || '';
      const principalSubdivision = data.principalSubdivision || '';
      
      return locality && principalSubdivision 
        ? `${locality}, ${principalSubdivision}`
        : data.locality || data.city || 'Unknown Location';
        
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      return 'Location detected';
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        loading: false,
        error: 'Geolocation is not supported by this browser.',
      }));
      return;
    }

    const handleSuccess = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      
      try {
        const address = await reverseGeocode(latitude, longitude);
        setLocation({
          latitude,
          longitude,
          address,
          loading: false,
          error: null,
        });
      } catch {
        setLocation({
          latitude,
          longitude,
          address: 'Location detected',
          loading: false,
          error: null,
        });
      }
    };

    const handleError = (error: GeolocationPositionError) => {
      let errorMessage = 'Unable to retrieve your location';
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Location access denied by user';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Location information is unavailable';
          break;
        case error.TIMEOUT:
          errorMessage = 'Location request timed out';
          break;
      }

      setLocation(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    };

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      defaultOptions
    );
  }, []);

  return location;
};