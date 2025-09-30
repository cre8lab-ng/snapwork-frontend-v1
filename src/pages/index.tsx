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

  const getServiceBackgroundColor = (index: number) => {
    const colors = [
      'bg-green-100',    // Light green
      'bg-purple-100',   // Light purple
      'bg-pink-100',     // Light pink
      'bg-yellow-100',   // Light yellow
      'bg-orange-100',   // Light orange
      'bg-green-200',    // Medium green
      'bg-purple-200',   // Medium purple
      'bg-pink-200',     // Medium pink
      'bg-yellow-200',   // Medium yellow
      'bg-orange-200',   // Medium orange
    ];
    return colors[index % colors.length];
  };

  const handleServiceSelect = (service: Service) => {
    console.log("Selected service:", service);
  };

  return (
    <>
      <WebPageTitle title="Snapwork | Home" />

      {/* Main Content */}
      <main className="bg-gray-50 min-h-screen">
        {/* Full Width Banner Image */}
        <div className="w-full bg-blue-50 mb-8 h-32 overflow-hidden">
          <Image
            src="/images/artisans-banner.svg"
            alt="Artisan hands banner"
            width={1200}
            height={128}
            className="w-full h-full object-cover object-top"
            priority
          />
        </div>

        {/* Full Width Services Section */}
        <section className="w-full bg-gray-50 py-8 mb-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Explore Services
            </h2>

            <div className="flex gap-4 flex-wrap">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className={`flex flex-col items-center justify-center ${getServiceBackgroundColor(index)} rounded-2xl p-4 hover:shadow-md transition cursor-pointer w-[120px] h-24 flex-shrink-0 border border-gray-100`}
                >
                  <Icon name={service.icon} size="1.5" />
                  <p className="text-xs font-medium text-center text-[#0D0D0D] mt-1">
                    {service.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Promotional Banners */}
        <section className="w-full py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            {/* Service Promotion Banner */}
            <div className="relative bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300 group min-h-[180px] mb-6">
              <div className="flex items-center h-full">
                <div className="flex-1 pr-6">
                  <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full mb-3">
                    SPECIAL OFFER
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 leading-tight mb-2">
                    Don&apos;t miss out on <br />
                    <span className="text-blue-600">
                      getting the best service
                    </span>
                  </h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-sm text-gray-600">Starting from</span>
                    <span className="text-xl font-bold text-blue-600">
                      ₦3,000
                    </span>
                  </div>
                  <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm">
                    Book Now
                  </button>
                </div>

                <div className="relative w-36 h-36 flex-shrink-0 bg-blue-50 rounded-xl flex items-end justify-center overflow-hidden">
                  <div className="relative w-32 h-32">
                    <Image
                      src="/images/electrician-cropped.svg"
                      alt="Professional Electrician Service"
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Provider Recruitment Banner */}
            <div className="relative bg-gradient-to-br from-purple-600 to-blue-700 rounded-2xl p-6 hover:shadow-md transition-all duration-300 group min-h-[180px]">
              <div className="flex items-center h-full">
                <div className="relative w-36 h-36 flex-shrink-0 bg-white bg-opacity-10 rounded-xl flex items-end justify-center mr-6 overflow-hidden">
                  <div className="relative w-32 h-32">
                    <Image
                      src="/images/cleaner-cropped.svg"
                      alt="Join Our Service Providers"
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                <div className="flex-1 text-right">
                  <div className="inline-block px-3 py-1 bg-white bg-opacity-20 text-white text-xs font-medium rounded-full mb-3">
                    EARN MONEY
                  </div>
                  <h3 className="text-xl font-semibold text-white leading-tight mb-2">
                    <span className="text-yellow-300">Urgent 2k?</span>
                    <br />
                    Join our line of trusted
                    <br />
                    <span className="text-pink-200">service providers</span>
                  </h3>
                  <button className="px-5 py-2 bg-white text-purple-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium text-sm">
                    Join Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
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
