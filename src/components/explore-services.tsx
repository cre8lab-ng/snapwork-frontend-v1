import Icon from "./icon";

  
  export default function ExploreServices() {
    const services = [
        { title: "Inverter Repair & install", icon: "inverter-repair" },
        { title: "Plumbing", icon: "plumbing" },
        { title: "Generator Repair & install", icon: "generator-repair" },
        { title: "Makeup Services", icon: "makeup-services" },
        { title: "Laundry & Dry Cleaning", icon: "laundry-drycleaning" },
        { title: "Cleaning Services", icon: "cleaning-services" },
        { title: "Catering Services", icon: "catering-services" },
        { title: "Hair Services", icon: "hair-services" },
        { title: "Fashion Designer", icon: "fashion-designer" },
        { title: "Electrical Services", icon: "electrical-services" },
    ];
  
    return (
      <div className="px-6 py-8">
        <h2 className="text-2xl font-semibold mb-6">Explore Services</h2>
        <div className="flex flex-wrap gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center w-32 h-32 bg-[#F3F7FF] rounded-lg p-3 hover:shadow-md transition"
            >
                         <Icon name={service.icon} />

              <p className="text-sm font-medium text-center text-[#0D0D0D]">
                {service.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  