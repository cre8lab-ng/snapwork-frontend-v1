import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { CalendarDaysIcon, ClockIcon, MapPinIcon, CameraIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import WebPageTitle from '@/components/webpagetitle';
import Navbar from '@/components/navbar';

interface BookingDetails {
  providerId: string;
  providerName: string;
  providerAvatar: string;
  providerRating: number;
  service: string;
  date: string;
  time: string;
  price: string;
  location: string;
}

export default function BookingConfirm() {
  const router = useRouter();
  const { providerId, date, time } = router.query;
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (providerId && date && time) {
      // Mock booking details
      const mockBooking: BookingDetails = {
        providerId: providerId as string,
        providerName: 'John Electrician',
        providerAvatar: '/api/placeholder/60/60',
        providerRating: 4.9,
        service: 'Electrical Repair',
        date: new Date(date as string).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        time: time as string,
        price: '₦8,500',
        location: 'Lagos, Nigeria'
      };
      setBookingDetails(mockBooking);
    }
  }, [providerId, date, time]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos = Array.from(files).slice(0, 5 - photos.length);
      setPhotos([...photos, ...newPhotos]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleConfirmBooking = async () => {
    setIsProcessing(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsProcessing(false);
      router.push(`/booking/payment?bookingId=BK${Date.now()}`);
    }, 2000);
  };

  if (!bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <WebPageTitle title="Confirm Booking | Snapwork" />
      <Navbar onUserClick={() => {}} />
      
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Confirm Your Booking</h1>
          <p className="text-gray-600">Review your booking details and add any special requirements</p>
        </div>

        {/* Provider Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <Image
              src={bookingDetails.providerAvatar}
              alt={bookingDetails.providerName}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">{bookingDetails.providerName}</h3>
              <div className="flex items-center">
                <StarIcon className="h-4 w-4 text-yellow-400" />
                <span className="ml-1 text-sm font-medium">{bookingDetails.providerRating}</span>
              </div>
              <p className="text-sm text-gray-600">{bookingDetails.service}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <CalendarDaysIcon className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium">{bookingDetails.date}</p>
                </div>
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-medium">{bookingDetails.time}</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium">{bookingDetails.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Requirements */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <DocumentTextIcon className="h-5 w-5 mr-2" />
            Service Requirements
          </h3>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe the issue, specific requirements, or any additional information..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photos (Optional - Max 5)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <CameraIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>Upload photos</span>
                    <input
                      type="file"
                      className="sr-only"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      disabled={photos.length >= 5}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
              </div>
            </div>

            {photos.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={URL.createObjectURL(photo)}
                      alt={`Upload ${index + 1}`}
                      width={100}
                      height={96}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Pricing</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Service Fee</span>
              <span className="font-medium">{bookingDetails.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Platform Fee</span>
              <span className="font-medium">₦500</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-blue-600">₦9,000</span>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirmBooking}
          disabled={isProcessing}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            'Confirm & Proceed to Payment'
          )}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          By confirming, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </>
  );
}