
import ExploreServices from "@/components/explore-services";
import LocationInput from "@/components/location-input";
import ServiceSearch from "@/components/service-search";
import QuickMatch from "@/components/quick-match";
import OTPModal from "@/components/ui/modals/otp";
import SignInModal from "@/components/ui/modals/sign-in";
import { SignUpModal } from "@/components/ui/modals/sign-up";
import Navbar from "@/components/navbar";
import PromoBanners from "@/components/promo-banners";
import WebPageTitle from "@/components/webpagetitle";
import { useState } from "react";

interface Service {
  id: string;
  title: string;
  icon: string;
  category: string;
}

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

export default function Home() {
  const [modalType, setModalType] = useState<'signin' | 'signup' | 'verify' | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    // Navigate to provider selection or booking flow
    console.log('Selected service:', service);
  };

  const handleProviderSelect = (provider: Provider) => {
    // Navigate to booking confirmation
    console.log('Selected provider:', provider);
  };

  return (
    <>
      <WebPageTitle title="Booking | Snapwork" />
      <Navbar onUserClick={() => setModalType('signin')} />
      
      {/* Discovery Section */}
      <div className="px-6 py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Find Services Near You</h1>
          
          {/* Location Input */}
          <div className="mb-6">
            <LocationInput 
              onLocationSelect={handleLocationSelect}
              placeholder="Enter your location to get started"
            />
          </div>

          {/* Service Search */}
          <div className="mb-8">
            <ServiceSearch onServiceSelect={handleServiceSelect} />
          </div>

          {/* Quick Match */}
          {selectedLocation && (
            <div className="mb-8">
              <QuickMatch 
                serviceType={selectedService?.title}
                location={selectedLocation}
                onProviderSelect={handleProviderSelect}
              />
            </div>
          )}
        </div>
      </div>

      <ExploreServices onServiceSelect={handleServiceSelect} />
      <PromoBanners/>

      {modalType === 'signin' && (
        <SignInModal
          onClose={() => setModalType(null)}
          onContinue={() => setModalType('verify')}
          onSwitchToSignUp={() => setModalType('signup')}
        />
      )}

      {modalType === 'verify' && (
        <OTPModal
          onClose={() => setModalType(null)}
          onBack={() => setModalType('signin')}
        />
      )}

      {modalType === 'signup' && (
        <SignUpModal
          onClose={() => setModalType(null)}
          onSwitch={() => setModalType('signin')}
        />
      )}
    </>
  );
}
