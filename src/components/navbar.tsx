import Image from "next/image";
import { useGeolocation } from "../hooks/useGeolocation";

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
          <span>{getLocationDisplay()}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex items-center border rounded px-3 py-2 text-gray-500">
          <input
            type="text"
            placeholder="Search for your next service......"
            className="outline-none bg-transparent text-sm w-64"
          />
        </div>

        <button className="bg-[#1A2D7A] text-white p-2 rounded-full">
          {/* List Icon */}
        </button>
        <button
          className="bg-[#1A2D7A] text-white p-2 rounded-full"
          onClick={onUserClick}
        >
          {/* Users Icon */}
          Open User Modal
        </button>
      </div>
    </div>
  );
}
