import OTPModal from "@/components/ui/modals/otp";
import SignInModal from "@/components/ui/modals/sign-in";
import { SignUpModal } from "@/components/ui/modals/sign-up";
import WebPageTitle from "@/components/webpagetitle";
import Icon from "@/components/icon";
import Image from "next/image";
import { useState } from "react";
import { Sparkles, TrendingUp, Zap, ArrowRight } from "lucide-react";

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

            <div className="flex gap-4 flex-wrap">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className={`flex flex-col items-center justify-center ${getServiceBackgroundColor(
                    index
                  )} rounded-2xl p-4 hover:shadow-md transition cursor-pointer w-[120px] h-24 flex-shrink-0 border border-gray-100`}
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

        <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Service Promotion Banner - Glassmorphism Style */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 rounded-3xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 group">
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
                <div
                  className="absolute bottom-0 -right-4 w-72 h-72 bg-cyan-200 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>

              <div className="relative flex flex-col md:flex-row items-center p-8 md:p-10 gap-8">
                {/* Content */}
                <div className="flex-1 text-white z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                    <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold tracking-wider rounded-full border border-white/30">
                      LIMITED TIME OFFER
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
                    Transform Your Space
                    <br />
                    <span className="text-yellow-300 inline-flex items-center gap-2">
                      Premium Services
                      <Zap className="w-8 h-8 inline animate-bounce" />
                    </span>
                  </h3>

                  <p className="text-blue-50 text-lg mb-6 max-w-md">
                    Expert professionals ready to deliver excellence at your
                    doorstep
                  </p>

                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-white/80 text-base">
                      Starting from
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black text-yellow-300">
                        ₦3,000
                      </span>
                      <span className="text-white/60 text-sm">/service</span>
                    </div>
                  </div>

                  <button className="group/btn px-8 py-4 bg-white text-blue-600 rounded-2xl hover:bg-yellow-300 hover:text-blue-900 transition-all duration-300 font-bold text-base shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-2">
                    Book Now
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Image Container with 3D effect */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-lg rounded-3xl -rotate-3 group-hover:rotate-3 transition-transform duration-500"></div>
                  <div className="relative w-full h-full bg-white/30 backdrop-blur-xl rounded-3xl flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500 border-4 border-white/40">
                    <div className="text-9xl">⚡</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Provider Recruitment Banner - Modern Dark Theme */}
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 rounded-3xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 group">
              {/* Animated grid background */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                    backgroundSize: "50px 50px",
                  }}
                ></div>
              </div>

              {/* Floating orbs */}
              <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
              <div
                className="absolute bottom-10 right-10 w-40 h-40 bg-pink-400 rounded-full filter blur-3xl opacity-30 animate-pulse"
                style={{ animationDelay: "1.5s" }}
              ></div>

              <div className="relative flex flex-col md:flex-row-reverse items-center p-8 md:p-10 gap-8">
                {/* Content */}
                <div className="flex-1 text-white z-10 md:text-right">
                  <div className="flex items-center gap-2 mb-4 md:justify-end">
                    <TrendingUp className="w-5 h-5 text-green-400 animate-pulse" />
                    <span className="px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 text-xs font-bold tracking-wider rounded-full shadow-lg">
                      💰 EARN DAILY
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
                    <span className="text-yellow-300">Need Quick Cash?</span>
                    <br />
                    Join{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-yellow-200">
                      5,000+ Providers
                    </span>
                    <br />
                    Earning with Us
                  </h3>

                  <p className="text-purple-100 text-lg mb-6 max-w-md md:ml-auto">
                    Start earning today with flexible hours and guaranteed
                    payments
                  </p>

                  <div className="flex items-center gap-4 mb-6 md:justify-end flex-wrap">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-300">
                        ₦50K+
                      </div>
                      <div className="text-xs text-purple-200">
                        Avg. Monthly
                      </div>
                    </div>
                    <div className="w-px h-12 bg-white/20"></div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pink-300">
                        4.8★
                      </div>
                      <div className="text-xs text-purple-200">
                        Provider Rating
                      </div>
                    </div>
                  </div>

                  <button className="group/btn px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 rounded-2xl hover:from-yellow-300 hover:to-orange-300 transition-all duration-300 font-bold text-base shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-2 md:ml-auto">
                    Join Now
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Image Container with floating effect */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-pink-400/20 backdrop-blur-md rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="relative w-full h-full bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500 border-4 border-white/20 shadow-2xl">
                    <div className="text-9xl animate-bounce">👷</div>
                  </div>

                  {/* Floating badges */}
                  <div className="absolute -top-4 -right-4 bg-green-400 text-green-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse">
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
