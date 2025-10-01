import OTPModal from "@/components/ui/modals/otp";
import SignInModal from "@/components/ui/modals/sign-in";
import { SignUpModal } from "@/components/ui/modals/sign-up";
import WebPageTitle from "@/components/webpagetitle";
import Icon from "@/components/icon";
import Image from "next/image";
import { useState } from "react";
import { Sparkles, TrendingUp, ArrowRight } from "lucide-react";

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
      "bg-green-100", // Light green
      "bg-purple-100", // Light purple
      "bg-pink-100", // Light pink
      "bg-yellow-100", // Light yellow
      "bg-orange-100", // Light orange
      "bg-green-200", // Medium green
      "bg-purple-200", // Medium purple
      "bg-pink-200", // Medium pink
      "bg-yellow-200", // Medium yellow
      "bg-orange-200", // Medium orange
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

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className={`flex flex-col items-center justify-center ${getServiceBackgroundColor(
                    index
                  )} rounded-2xl p-3 sm:p-4 hover:shadow-md transition cursor-pointer h-20 sm:h-24 border border-gray-100 min-w-0`}
                >
                  <Icon name={service.icon} size="1.5" />
                  <p className="text-xs font-medium text-center text-[#0D0D0D] mt-1 leading-tight">
                    {service.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Promotional Banners */}

        <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Service Promotion Banner */}
            <div className="relative overflow-hidden bg-[var(--color-darkblue)] rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div className="relative flex flex-col lg:flex-row items-center justify-between p-10 lg:p-12 gap-10">
                {/* Content */}
                <div className="flex-1 text-white z-10 max-w-2xl">
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="w-6 h-6 text-[var(--color-orange-100)]" />
                    <span className="px-4 py-2 bg-white/20 text-white text-xs font-bold tracking-wider rounded-full border border-white/30">
                      LIMITED TIME OFFER
                    </span>
                  </div>

                  <h3 className="text-h2 font-bold leading-tight mb-4 text-white">
                    Transform Your Space
                    <br />
                    <span className="text-[var(--color-orange-100)] inline-flex items-center gap-2">
                      Premium Services
                    </span>
                  </h3>

                  <p className="text-white/80 text-lg mb-8 max-w-lg">
                    Expert professionals ready to deliver excellence at your
                    doorstep
                  </p>

                  <div className="flex items-baseline gap-3 mb-8">
                    <span className="text-white/70 text-base">
                      Starting from
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-[var(--color-orange-100)]">
                        ₦3,000
                      </span>
                      <span className="text-white/60 text-sm">/service</span>
                    </div>
                  </div>

                  <button className="group/btn px-8 py-4 bg-[var(--color-orange-100)] text-[var(--color-darkblue)] rounded-xl hover:bg-[var(--color-orange-200)] transition-all duration-300 font-bold text-base shadow-lg hover:shadow-xl flex items-center gap-2">
                    Book Now
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Image Container */}
                <div className="relative w-64 h-64 lg:w-80 lg:h-80 flex-shrink-0">
                  <div className="relative w-full h-full bg-white/10 rounded-3xl overflow-hidden group-hover:scale-105 transition-transform duration-300 border-2 border-white/20 shadow-lg">
                    <Image
                      src="/images/artisans.svg"
                      alt="Professional artisan services"
                      fill
                      className="object-cover drop-shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Provider Recruitment Banner */}
            <div className="relative overflow-hidden bg-[var(--color-blue-300)] rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div className="relative flex flex-col lg:flex-row-reverse items-center justify-between p-10 lg:p-12 gap-10">
                {/* Content */}
                <div className="flex-1 text-white z-10 lg:text-right max-w-2xl">
                  <div className="flex items-center gap-2 mb-6 lg:justify-end">
                    <TrendingUp className="w-6 h-6 text-[var(--color-orange-100)]" />
                    <span className="px-4 py-2 bg-[var(--color-orange-100)] text-[var(--color-darkblue)] text-xs font-bold tracking-wider rounded-full shadow-lg">
                      💰 EARN DAILY
                    </span>
                  </div>

                  <h3 className="text-h2 font-bold leading-tight mb-4 text-white">
                    <span className="text-[var(--color-orange-100)]">Need Quick Cash?</span>
                    <br />
                    Join 5,000+ Providers
                    <br />
                    Earning with Us
                  </h3>

                  <p className="text-white/80 text-lg mb-8 max-w-lg lg:ml-auto">
                    Start earning today with flexible hours and guaranteed
                    payments
                  </p>

                  <div className="flex items-center gap-6 mb-8 lg:justify-end flex-wrap">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[var(--color-orange-100)]">
                        ₦50K+
                      </div>
                      <div className="text-xs text-white/70">
                        Avg. Monthly
                      </div>
                    </div>
                    <div className="w-px h-12 bg-white/20"></div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[var(--color-orange-100)]">
                        4.8★
                      </div>
                      <div className="text-xs text-white/70">
                        Provider Rating
                      </div>
                    </div>
                  </div>

                  <button className="group/btn px-8 py-4 bg-[var(--color-orange-100)] text-[var(--color-darkblue)] rounded-xl hover:bg-[var(--color-orange-200)] transition-all duration-300 font-bold text-base shadow-lg hover:shadow-xl flex items-center gap-2 lg:ml-auto">
                    Join Now
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Image Container */}
                <div className="relative w-64 h-64 lg:w-80 lg:h-80 flex-shrink-0">
                  <div className="relative w-full h-full bg-white/10 rounded-3xl overflow-hidden group-hover:scale-105 transition-transform duration-300 border-2 border-white/20 shadow-lg">
                    <Image
                      src="/images/service-worker.svg"
                      alt="Professional worker services"
                      fill
                      className="object-cover drop-shadow-lg"
                    />
                  </div>

                  {/* Badge */}
                  <div className="absolute -top-3 -right-3 bg-[var(--color-orange-100)] text-[var(--color-darkblue)] px-4 py-2 rounded-full font-bold text-sm shadow-xl">
                    +500 this week
                  </div>
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
