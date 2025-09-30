import { useState } from 'react';
import { MapPinIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface LocationInputProps {
  onLocationSelect: (location: string) => void;
  placeholder?: string;
}

export default function LocationInput({ onLocationSelect, placeholder = "Enter your location" }: LocationInputProps) {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock location suggestions - in real app, this would use Google Places API
  const mockSuggestions = [
    'Lagos, Nigeria',
    'Abuja, Nigeria', 
    'Port Harcourt, Nigeria',
    'Kano, Nigeria',
    'Ibadan, Nigeria'
  ];

  const handleLocationChange = (value: string) => {
    setLocation(value);
    if (value.length > 2) {
      const filtered = mockSuggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setLocation(suggestion);
    setShowSuggestions(false);
    onLocationSelect(suggestion);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In real app, reverse geocode coordinates to address
          const { latitude, longitude } = position.coords;
          const mockAddress = `Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
          setLocation(mockAddress);
          onLocationSelect(mockAddress);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPinIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={location}
          onChange={(e) => handleLocationChange(e.target.value)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={getCurrentLocation}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-600 hover:text-blue-800"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
            >
              <div className="flex items-center">
                <MapPinIcon className="h-4 w-4 text-gray-400 mr-2" />
                {suggestion}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}