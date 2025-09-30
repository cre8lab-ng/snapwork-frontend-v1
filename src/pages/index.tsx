import OTPModal from "@/components/ui/modals/otp";
import SignInModal from "@/components/ui/modals/sign-in";
import { SignUpModal } from "@/components/ui/modals/sign-up";
import WebPageTitle from "@/components/webpagetitle";
import Icon from "@/components/icon";
import Image from "next/image";
import { useState } from "react";

interface Service {
  id: string;
  title: string;
  icon: string;
  category: string;
}

export default function Home() {
  const [modalType, setModalType] = useState<
    "signin" | "signup" | "verify" | null
  >(null);

  const services: Service[] = [
    {
      id: "1",
      title: "Inverter Repair & install",
      icon: "inverter-repair",
      category: "Electrical",
    },
    {
      id: "2",
      title: "Plumbing",
      icon: "plumbing",
      category: "Home Maintenance",
    },
    {
      id: "3",
      title: "Generator Repair & install",
      icon: "generator-repair",
      category: "Electrical",
    },
    {
      id: "4",
      title: "Makeup Services",
      icon: "makeup-services",
      category: "Beauty",
    },
    {
      id: "5",
      title: "Laundry & Dry Cleaning",
      icon: "laundry-drycleaning",
      category: "Cleaning",
    },
    {
      id: "6",
      title: "Cleaning Services",
      icon: "cleaning-services",
      category: "Cleaning",
    },
    {
      id: "7",
      title: "Catering Services",
      icon: "catering-services",
      category: "Food",
    },
    {
      id: "8",
      title: "Hair Services",
      icon: "hair-services",
      category: "Beauty",
    },
    {
      id: "9",
      title: "Fashion Designer",
      icon: "fashion-designer",
      category: "Fashion",
    },
    {
      id: "10",
      title: "Electrical Services",
      icon: "electrical-services",
      category: "Electrical",
    },
  ];

  const handleServiceSelect = (service: Service) => {
    console.log("Selected service:", service);
  };

  return (
    <>
      <WebPageTitle title="Snapwork | Home" />

      {/* Main Content */}
      <main className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Banner Image */}
          <div className="mb-8 rounded-lg overflow-hidden shadow-sm">
            <Image
              src="/images/artisans-banner.svg"
              alt="Artisan hands banner"
              width={1200}
              height={200}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Skilled Artisans Near You
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with trusted professionals for all your home and business
              needs
            </p>
          </div>

          {/* Services Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Explore Services
              </h2>
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                <span className="text-sm font-medium">Filter</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                </div>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className="flex flex-col items-center justify-center bg-[#F3F7FF] rounded-lg p-4 hover:shadow-md hover:bg-blue-50 transition cursor-pointer h-32"
                >
                  <Icon name={service.icon} />
                  <p className="text-sm font-medium text-center text-[#0D0D0D] mt-2">
                    {service.title}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* Promotional Banners */}
          <section className="grid md:grid-cols-2 gap-8">
            {/* Service Promotion Banner */}
            <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 rounded-3xl p-8 h-64 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-32 h-32 bg-blue-200 rounded-full blur-2xl"></div>
                <div className="absolute bottom-4 left-4 w-24 h-24 bg-indigo-200 rounded-full blur-xl"></div>
              </div>

              <div className="relative z-10 h-full flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-4">
                    SPECIAL OFFER
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-3">
                    Don&apos;t miss out on <br />
                    <span className="text-blue-600">
                      getting the best service
                    </span>
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Starting from</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₦3,000
                    </span>
                  </div>
                  <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                    Book Now
                  </button>
                </div>

                <div className="relative w-40 h-40 flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <Image
                    src="/images/electrician-cropped.svg"
                    alt="Professional Electrician Service"
                    fill
                    className="object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Provider Recruitment Banner */}
            <div className="relative bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 rounded-3xl p-8 h-64 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              {/* Background Pattern */}
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-300 opacity-20 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white opacity-10 rounded-full"></div>
              </div>

              <div className="relative z-10 h-full flex items-center justify-between">
                <div className="relative w-40 h-40 flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <Image
                    src="/images/cleaner-cropped.svg"
                    alt="Join Our Service Providers"
                    fill
                    className="object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 pl-4 text-right">
                  <div className="inline-block px-3 py-1 bg-white bg-opacity-20 text-white text-xs font-semibold rounded-full mb-4">
                    EARN MONEY
                  </div>
                  <h3 className="text-2xl font-bold text-white leading-tight mb-3">
                    <span className="text-yellow-300">Urgent 2k?</span>
                    <br />
                    Join our line of trusted
                    <br />
                    <span className="text-pink-200">service providers</span>
                  </h3>
                  <button className="mt-4 px-6 py-2 bg-white text-purple-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium">
                    Join Now
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Modals */}
      {modalType === "signin" && (
        <SignInModal
          onClose={() => setModalType(null)}
          onContinue={() => setModalType("verify")}
          onSwitchToSignUp={() => setModalType("signup")}
        />
      )}

      {modalType === "verify" && (
        <OTPModal
          onClose={() => setModalType(null)}
          onBack={() => setModalType("signin")}
        />
      )}

      {modalType === "signup" && (
        <SignUpModal
          onClose={() => setModalType(null)}
          onSwitch={() => setModalType("signin")}
        />
      )}
    </>
  );
}
