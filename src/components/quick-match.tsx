import { useState } from 'react';
import Image from 'next/image';
import { BoltIcon, StarIcon, ClockIcon } from '@heroicons/react/24/solid';
import { MapPinIcon } from '@heroicons/react/24/outline';

interface Provider {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  eta: string;
  price: string;
  avatar: string;
  specialties: string[];
}

interface QuickMatchProps {
  serviceType?: string;
  location?: string;
  onProviderSelect: (provider: Provider) => void;
}

export default function QuickMatch({ serviceType, location, onProviderSelect }: QuickMatchProps) {
  const [isMatching, setIsMatching] = useState(false);
  const [matchedProvider, setMatchedProvider] = useState<Provider | null>(null);

  // Mock provider data
  const mockProviders: Provider[] = [
    {
      id: '1',
      name: 'John Electrician',
      rating: 4.9,
      reviews: 127,
      distance: '0.8 km',
      eta: '15 mins',
      price: '₦5,000',
      avatar: '/api/placeholder/40/40',
      specialties: ['Electrical Repair', 'Installation', 'Maintenance']
    },
    {
      id: '2', 
      name: 'Sarah Plumber',
      rating: 4.8,
      reviews: 89,
      distance: '1.2 km',
      eta: '20 mins',
      price: '₦4,500',
      avatar: '/api/placeholder/40/40',
      specialties: ['Plumbing', 'Pipe Repair', 'Installation']
    },
    {
      id: '3',
      name: 'Mike Cleaner',
      rating: 4.7,
      reviews: 156,
      distance: '0.5 km',
      eta: '10 mins',
      price: '₦3,000',
      avatar: '/api/placeholder/40/40',
      specialties: ['House Cleaning', 'Deep Cleaning', 'Office Cleaning']
    }
  ];

  const handleQuickMatch = async () => {
    setIsMatching(true);
    
    // Simulate matching algorithm
    setTimeout(() => {
      const randomProvider = mockProviders[Math.floor(Math.random() * mockProviders.length)];
      setMatchedProvider(randomProvider);
      setIsMatching(false);
    }, 2000);
  };

  const handleSelectProvider = () => {
    if (matchedProvider) {
      onProviderSelect(matchedProvider);
    }
  };

  if (isMatching) {
    return (
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold mb-2">Finding Your Perfect Match</h3>
          <p className="text-blue-100">Analyzing {serviceType || 'service'} providers near {location || 'you'}...</p>
        </div>
      </div>
    );
  }

  if (matchedProvider) {
    return (
      <div className="bg-white rounded-xl border-2 border-green-200 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <BoltIcon className="h-6 w-6 text-green-500 mr-2" />
            <h3 className="text-lg font-semibold text-green-700">Perfect Match Found!</h3>
          </div>
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Best Match
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Image
            src={matchedProvider.avatar}
            alt={matchedProvider.name}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover"
          />
          
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-gray-900">{matchedProvider.name}</h4>
            
            <div className="flex items-center mt-1 mb-2">
              <div className="flex items-center">
                <StarIcon className="h-4 w-4 text-yellow-400" />
                <span className="ml-1 text-sm font-medium">{matchedProvider.rating}</span>
                <span className="ml-1 text-sm text-gray-500">({matchedProvider.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center">
                <MapPinIcon className="h-4 w-4 mr-1" />
                {matchedProvider.distance}
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-1" />
                {matchedProvider.eta} away
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {matchedProvider.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                >
                  {specialty}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-green-600">
                {matchedProvider.price}
              </div>
              <button
                onClick={handleSelectProvider}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
      <div className="text-center">
        <BoltIcon className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
        <h3 className="text-xl font-semibold mb-2">Quick Match</h3>
        <p className="text-blue-100 mb-4">
          Get instantly matched with the best {serviceType || 'service'} provider near you
        </p>
        <button
          onClick={handleQuickMatch}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition transform hover:scale-105"
        >
          Find My Match
        </button>
      </div>
    </div>
  );
}