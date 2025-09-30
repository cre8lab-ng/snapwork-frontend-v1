import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { StarIcon, MapPinIcon, ClockIcon, PhoneIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import { CalendarDaysIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import WebPageTitle from '@/components/webpagetitle';
import Navbar from '@/components/navbar';

interface Provider {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  price: string;
  avatar: string;
  specialties: string[];
  description: string;
  phone: string;
  availability: string[];
  completedJobs: number;
  responseTime: string;
  gallery: string[];
}

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
}

export default function ProviderProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [provider, setProvider] = useState<Provider | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'gallery'>('overview');

  // Mock provider data
  useEffect(() => {
    if (id) {
      const mockProvider: Provider = {
        id: id as string,
        name: 'John Electrician',
        rating: 4.9,
        reviews: 127,
        distance: '0.8 km away',
        price: '₦5,000 - ₦15,000',
        avatar: '/api/placeholder/120/120',
        specialties: ['Electrical Repair', 'Installation', 'Maintenance', 'Wiring'],
        description: 'Professional electrician with 8+ years of experience. Specialized in residential and commercial electrical work. Available for emergency repairs and installations.',
        phone: '+234 801 234 5678',
        availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        completedJobs: 342,
        responseTime: '< 30 mins',
        gallery: ['/api/placeholder/200/150', '/api/placeholder/200/150', '/api/placeholder/200/150', '/api/placeholder/200/150']
      };

      const mockReviews: Review[] = [
        {
          id: '1',
          customerName: 'Sarah M.',
          rating: 5,
          comment: 'Excellent work! Fixed my electrical issues quickly and professionally.',
          date: '2024-01-15',
          service: 'Electrical Repair'
        },
        {
          id: '2',
          customerName: 'Mike O.',
          rating: 5,
          comment: 'Very reliable and knowledgeable. Highly recommended!',
          date: '2024-01-10',
          service: 'Installation'
        },
        {
          id: '3',
          customerName: 'Grace A.',
          rating: 4,
          comment: 'Good service, arrived on time and completed the job well.',
          date: '2024-01-05',
          service: 'Maintenance'
        }
      ];

      setProvider(mockProvider);
      setReviews(mockReviews);
    }
  }, [id]);

  const availableTimes = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      router.push(`/booking/confirm?providerId=${id}&date=${selectedDate.toISOString()}&time=${selectedTime}`);
    }
  };

  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <WebPageTitle title={`${provider.name} | Snapwork`} />
      <Navbar onUserClick={() => {}} />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Provider Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-start space-x-6">
            <Image
              src={provider.avatar}
              alt={provider.name}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover"
            />
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{provider.name}</h1>
                <div className="flex items-center space-x-2">
                  <CheckBadgeIcon className="h-6 w-6 text-blue-500" />
                  <span className="text-sm text-blue-600 font-medium">Verified</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 font-semibold">{provider.rating}</span>
                  <span className="ml-1 text-gray-500">({provider.reviews} reviews)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  {provider.distance}
                </div>
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  {provider.responseTime}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {provider.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  Call
                </button>
                <button className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  <ChatBubbleLeftIcon className="h-4 w-4 mr-2" />
                  Chat
                </button>
                <div className="text-xl font-bold text-green-600">{provider.price}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'overview', label: 'Overview' },
                { key: 'reviews', label: 'Reviews' },
                { key: 'gallery', label: 'Gallery' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as 'overview' | 'reviews' | 'gallery')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">About</h3>
                <p className="text-gray-600 mb-6">{provider.description}</p>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Completed Jobs</h4>
                    <p className="text-2xl font-bold text-blue-600">{provider.completedJobs}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Response Time</h4>
                    <p className="text-2xl font-bold text-green-600">{provider.responseTime}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Available Days</h4>
                  <div className="flex flex-wrap gap-2">
                    {provider.availability.map((day, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="font-medium">{review.customerName}</span>
                          <div className="flex items-center ml-2">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-600 mb-1">{review.comment}</p>
                      <span className="text-sm text-blue-600">{review.service}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Work Gallery</h3>
                <div className="grid grid-cols-2 gap-4">
                  {provider.gallery.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={`Work ${index + 1}`}
                      width={200}
                      height={160}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Booking Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <CalendarDaysIcon className="h-5 w-5 mr-2" />
            Schedule Appointment
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholderText="Choose a date"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Time
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a time</option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleBooking}
            disabled={!selectedDate || !selectedTime}
            className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </>
  );
}