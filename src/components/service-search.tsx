import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Icon from './icon';

interface Service {
  id: string;
  title: string;
  icon: string;
  category: string;
}

interface ServiceSearchProps {
  onServiceSelect: (service: Service) => void;
}

export default function ServiceSearch({ onServiceSelect }: ServiceSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const services: Service[] = [
    { id: '1', title: "Inverter Repair & Install", icon: "inverter-repair", category: "Electrical" },
    { id: '2', title: "Plumbing", icon: "plumbing", category: "Home Maintenance" },
    { id: '3', title: "Generator Repair & Install", icon: "generator-repair", category: "Electrical" },
    { id: '4', title: "Makeup Services", icon: "makeup-services", category: "Beauty" },
    { id: '5', title: "Laundry & Dry Cleaning", icon: "laundry-drycleaning", category: "Cleaning" },
    { id: '6', title: "Cleaning Services", icon: "cleaning-services", category: "Cleaning" },
    { id: '7', title: "Catering Services", icon: "catering-services", category: "Food" },
    { id: '8', title: "Hair Services", icon: "hair-services", category: "Beauty" },
    { id: '9', title: "Fashion Designer", icon: "fashion-designer", category: "Fashion" },
    { id: '10', title: "Electrical Services", icon: "electrical-services", category: "Electrical" },
  ];

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setShowResults(value.length > 0);
  };

  const handleServiceClick = (service: Service) => {
    setSearchTerm(service.title);
    setShowResults(false);
    onServiceSelect(service);
  };

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search for services..."
          className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {showResults && filteredServices.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredServices.map((service) => (
            <button
              key={service.id}
              onClick={() => handleServiceClick(service)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 mr-3 flex items-center justify-center">
                  <Icon name={service.icon} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{service.title}</div>
                  <div className="text-sm text-gray-500">{service.category}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {showResults && filteredServices.length === 0 && searchTerm.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
          <p className="text-gray-500 text-center">No services found for &quot;{searchTerm}&quot;</p>
        </div>
      )}
    </div>
  );
}