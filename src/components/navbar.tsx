import Image from "next/image";
import { useGeolocation } from "../hooks/useGeolocation";
import Icon from "./icon";

interface NavbarProps {
  onUserClick: () => void;
}

export default function Navbar({ onUserClick }: NavbarProps) {
  const { address, loading, error } = useGeolocation();

  const getLocationDisplay = () => {
    if (loading) return "Getting your location...";
    if (error) return "Unable to get location";
    return address || "Location not available";
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white shadow-sm">
      <div className="flex items-center space-x-3">
        <Image
          src="/images/snapwork-icon.svg"
          alt="Snapwork Icon"
          width={50}
          height={50}
        />
        <div className="flex items-center text-gray-500 space-x-2">
          <Icon name="location-pin" size="16" color="#6B7280" />
          <span>{getLocationDisplay()}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex items-center border rounded px-3 py-2 text-gray-500 relative">
          <input
            type="text"
            placeholder="Search for your next service......"
            className="outline-none bg-transparent text-sm w-64 pr-8"
          />
          <Icon 
            name="search" 
            size="16" 
            color="#6B7280" 
            className="absolute right-3"
          />
        </div>

        <button className="bg-[#1A2D7A] text-white p-2 rounded-full">
          <Icon name="shopping-cart" size="20" color="white" />
        </button>
        <button
          className="bg-[#1A2D7A] text-white p-2 rounded-full"
          onClick={onUserClick}
        >
          <Icon name="user" size="20" color="white" />
        </button>
      </div>
    </div>
  );
}
