import Icon from "./icon";

interface Service {
  id: string;
  title: string;
  icon: string;
  category: string;
}

interface ExploreServicesProps {
  onServiceSelect?: (service: Service) => void;
}

export default function ExploreServices({ onServiceSelect }: ExploreServicesProps) {
  const services = [
    { id: '1', title: "Inverter Repair & install", icon: "inverter-repair", category: "Electrical" },
    { id: '2', title: "Plumbing", icon: "plumbing", category: "Home Maintenance" },
    { id: '3', title: "Generator Repair & install", icon: "generator-repair", category: "Electrical" },
    { id: '4', title: "Makeup Services", icon: "makeup-services", category: "Beauty" },
    { id: '5', title: "Laundry & Dry Cleaning", icon: "laundry-drycleaning", category: "Cleaning" },
    { id: '6', title: "Cleaning Services", icon: "cleaning-services", category: "Cleaning" },
    { id: '7', title: "Catering Services", icon: "catering-services", category: "Food" },
    { id: '8', title: "Hair Services", icon: "hair-services", category: "Beauty" },
    { id: '9', title: "Fashion Designer", icon: "fashion-designer", category: "Fashion" },
    { id: '10', title: "Electrical Services", icon: "electrical-services", category: "Electrical" },
  ];

  const handleServiceClick = (service: Service) => {
    if (onServiceSelect) {
      onServiceSelect(service);
    }
  };

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-semibold mb-6">Explore Services</h2>
      <div className="flex flex-wrap gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => handleServiceClick(service)}
            className="flex flex-col items-center justify-center w-32 h-32 bg-[#F3F7FF] rounded-lg p-3 hover:shadow-md hover:bg-blue-50 transition cursor-pointer"
          >
            <Icon name={service.icon} />
            <p className="text-sm font-medium text-center text-[#0D0D0D] mt-2">
              {service.title}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
  