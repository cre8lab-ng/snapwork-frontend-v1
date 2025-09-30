import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  TruckIcon, 
  MapPinIcon, 
  PlayIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';
import { useGPSTracking, Location } from '../../../utils/gps-tracking';

interface BookingStatus {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  current: boolean;
  timestamp?: string;
  eta?: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
}

interface Provider {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  rating: number;
  vehicle?: {
    make: string;
    model: string;
    color: string;
    plate: string;
  };
}

interface Booking {
  id: string;
  service: string;
  provider: Provider;
  scheduledTime: string;
  address: string;
  status: string;
  totalAmount: number;
  notes?: string;
  photos?: string[];
  location?: Location;
}

const TrackBooking = () => {
  const router = useRouter();
  const { id } = router.query;
  const { simulateProviderMovement } = useGPSTracking();
  
  const [booking, setBooking] = useState<Booking | null>(null);
  const [statuses, setStatuses] = useState<BookingStatus[]>([]);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [newQuote, setNewQuote] = useState(0);
  const [realTimeETA, setRealTimeETA] = useState<string>('');
  const [, setProviderLocation] = useState<Location | null>(null);
  const [progressPhotos] = useState<string[]>([]);

  // Mock booking data
  useEffect(() => {
    if (id) {
      const mockBooking: Booking = {
        id: id as string,
        service: 'House Cleaning',
        provider: {
          id: 'provider-1',
          name: 'Sarah Johnson',
          avatar: '/api/placeholder/40/40',
          phone: '+1 (555) 123-4567',
          rating: 4.9,
          vehicle: {
            make: 'Toyota',
            model: 'Camry',
            color: 'Blue',
            plate: 'ABC-123'
          }
        },
        scheduledTime: '2024-01-15T14:00:00Z',
        address: '123 Main Street, Anytown, AT 12345',
        status: 'on-my-way',
        totalAmount: 120,
        notes: 'Please focus on kitchen and bathrooms',
        location: { lat: 40.7128, lng: -74.0060 } // User's location
      };

      const mockStatuses: BookingStatus[] = [
        {
          id: 'accepted',
          name: 'Accepted',
          description: 'Provider confirmed your booking',
          completed: true,
          current: false,
          timestamp: '2024-01-15T13:00:00Z'
        },
        {
          id: 'preparing',
          name: 'Preparing',
          description: 'Provider is getting ready',
          completed: true,
          current: false,
          timestamp: '2024-01-15T13:30:00Z'
        },
        {
          id: 'on-my-way',
          name: 'On My Way',
          description: 'Provider is heading to your location',
          completed: false,
          current: true,
          eta: '15 minutes',
          location: {
            lat: 40.7128,
            lng: -74.0060,
            address: '5th Avenue, New York'
          }
        },
        {
          id: 'arrived',
          name: 'Arrived',
          description: 'Provider has arrived at your location',
          completed: false,
          current: false
        },
        {
          id: 'in-progress',
          name: 'In Progress',
          description: 'Service is being performed',
          completed: false,
          current: false
        },
        {
          id: 'completed',
          name: 'Completed',
          description: 'Service has been completed',
          completed: false,
          current: false
        }
      ];

      setBooking(mockBooking);
      setStatuses(mockStatuses);

      // Start GPS tracking if provider is on the way
      if (mockBooking.status === 'on-my-way' && mockBooking.location) {
        const stopSimulation = simulateProviderMovement(
          mockBooking.id,
          mockBooking.location,
          (location, eta) => {
            setProviderLocation(location);
            setRealTimeETA(eta);
          }
        );

        // Simulate real-time updates
        const interval = setInterval(() => {
          simulateStatusUpdate();
        }, 30000); // Update every 30 seconds

        return () => {
          clearInterval(interval);
          stopSimulation();
        };
      } else {
        // Simulate real-time updates
        const interval = setInterval(() => {
          simulateStatusUpdate();
        }, 30000); // Update every 30 seconds

        return () => clearInterval(interval);
      }
    }
  }, [id, simulateProviderMovement]);

  const simulateStatusUpdate = () => {
    setStatuses(prev => {
      const updated = [...prev];
      const currentIndex = updated.findIndex(s => s.current);
      
      if (currentIndex !== -1 && currentIndex < updated.length - 1) {
        // Complete current status
        updated[currentIndex].completed = true;
        updated[currentIndex].current = false;
        updated[currentIndex].timestamp = new Date().toISOString();
        
        // Move to next status
        updated[currentIndex + 1].current = true;
        
        // Special handling for different statuses
        if (updated[currentIndex + 1].id === 'arrived') {
          // Simulate arrival notification
          setTimeout(() => {
            alert('Your provider has arrived! They will check in shortly.');
          }, 1000);
        } else if (updated[currentIndex + 1].id === 'in-progress') {
          // Simulate quote ready (if needed)
          setTimeout(() => {
            setNewQuote(150);
            setShowQuoteModal(true);
          }, 5000);
        }
      }
      
      return updated;
    });
  };

  const handleQuoteApproval = (approved: boolean) => {
    if (approved) {
      setShowQuoteModal(false);
      // Simulate payment processing
      setTimeout(() => {
        alert('Quote approved and payment processed!');
      }, 1000);
    } else {
      setShowQuoteModal(false);
      // Handle quote rejection
      alert('Quote declined. Please discuss with your provider.');
    }
  };

  const getStatusIcon = (status: BookingStatus) => {
    if (status.completed) {
      return <CheckCircleSolid className="w-6 h-6 text-green-500" />;
    }
    
    if (status.current) {
      switch (status.id) {
        case 'preparing':
          return <ClockIcon className="w-6 h-6 text-blue-500 animate-pulse" />;
        case 'on-my-way':
          return <TruckIcon className="w-6 h-6 text-blue-500 animate-pulse" />;
        case 'arrived':
          return <MapPinIcon className="w-6 h-6 text-blue-500 animate-pulse" />;
        case 'in-progress':
          return <PlayIcon className="w-6 h-6 text-blue-500 animate-pulse" />;
        default:
          return <ClockIcon className="w-6 h-6 text-blue-500 animate-pulse" />;
      }
    }
    
    return <CheckCircleIcon className="w-6 h-6 text-gray-300" />;
  };

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const currentStatus = statuses.find(s => s.current);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>
            <h1 className="text-lg font-semibold">Track Booking</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Current Status Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              {currentStatus && getStatusIcon(currentStatus)}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {currentStatus?.name}
            </h2>
            <p className="text-gray-600 mb-4">
              {currentStatus?.description}
            </p>
            
            {(currentStatus?.eta || realTimeETA) && (
              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <p className="text-blue-800 font-medium">
                  ETA: {realTimeETA || currentStatus?.eta}
                </p>
              </div>
            )}
            
            {currentStatus?.location && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">
                  Current location: {currentStatus.location.address}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Provider Info */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center space-x-4">
            <Image
              src={booking.provider.avatar}
              alt={booking.provider.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">
                {booking.provider.name}
              </h3>
              <div className="flex items-center space-x-1">
                <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">
                  {booking.provider.rating}
                </span>
              </div>
              {booking.provider.vehicle && (
                <p className="text-sm text-gray-500">
                  {booking.provider.vehicle.color} {booking.provider.vehicle.make} {booking.provider.vehicle.model} • {booking.provider.vehicle.plate}
                </p>
              )}
            </div>
            <div className="flex space-x-2">
              <button className="p-2 bg-blue-100 rounded-full hover:bg-blue-200">
                <PhoneIcon className="w-5 h-5 text-blue-600" />
              </button>
              <button className="p-2 bg-blue-100 rounded-full hover:bg-blue-200">
                <ChatBubbleLeftRightIcon className="w-5 h-5 text-blue-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Booking Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Service:</span>
              <span className="font-medium">{booking.service}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Scheduled:</span>
              <span className="font-medium">
                {new Date(booking.scheduledTime).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Address:</span>
              <span className="font-medium text-right flex-1 ml-4">
                {booking.address}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium">${booking.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Progress</h3>
          <div className="space-y-4">
            {statuses.map((status) => (
              <div key={status.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {getStatusIcon(status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${
                      status.completed ? 'text-green-600' : 
                      status.current ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                      {status.name}
                    </p>
                    {status.timestamp && (
                      <p className="text-xs text-gray-500">
                        {new Date(status.timestamp).toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                  <p className={`text-xs ${
                    status.completed ? 'text-gray-600' : 
                    status.current ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {status.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Photos (if in progress) */}
        {currentStatus?.id === 'in-progress' && progressPhotos.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Progress Updates</h3>
            <div className="grid grid-cols-2 gap-2">
              {progressPhotos.map((photo: string) => (
                <Image
                  key={photo}
                  src={photo}
                  alt="Progress update"
                  width={100}
                  height={96}
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              New Quote Ready
            </h3>
            <p className="text-gray-600 mb-4">
              Your provider has prepared an updated quote based on the work required.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Original Amount:</span>
                <span className="font-medium">${booking.totalAmount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">New Amount:</span>
                <span className="font-semibold text-lg">${newQuote}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between items-center">
                <span className="font-medium">Additional:</span>
                <span className="font-semibold text-green-600">
                  +${newQuote - booking.totalAmount}
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => handleQuoteApproval(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Decline
              </button>
              <button
                onClick={() => handleQuoteApproval(true)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Approve & Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackBooking;