import Image from "next/image";
import { useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import Icon from "./icon";

interface NavbarProps {
  onUserClick: () => void;
}

export default function Navbar({ onUserClick }: NavbarProps) {
  const { address, loading, error } = useGeolocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getLocationDisplay = () => {
    if (loading) return "Getting your location...";
    if (error) return "Unable to get location";
    return address || "Location not available";
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-white shadow-sm">
      {/* Main Navbar */}
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left Section - Logo only */}
        <div className="flex items-center">
          <Image
            src="/images/snapwork-logo.svg"
            alt="Snapwork Logo"
            width={0}
            height={0}
            className="w-auto h-auto"
          />
        </div>

        {/* Right Section - Location, Search Bar and Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Location Display - moved to extreme right */}
          <div className="hidden sm:flex items-center text-gray-500 space-x-2">
            <Icon name="location-pin" size="16" color="#6B7280" />
            <span className="text-xs md:text-sm truncate max-w-[120px] md:max-w-none">
              {getLocationDisplay()}
            </span>
          </div>

    

          {/* Search Button (Mobile/Tablet) */}
          <button className="lg:hidden bg-gray-100 text-gray-600 p-2 rounded-full">
            <Icon name="search" size="18" color="#6B7280" />
          </button>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden bg-[#1A2D7A] text-white p-2 rounded-full"
            onClick={toggleMobileMenu}
          >
            <Icon name={isMobileMenuOpen ? "x" : "menu"} size="20" color="white" />
          </button>
        </div>
      </div>

      {/* Mobile Location Bar */}
      <div className="sm:hidden px-4 py-2 bg-gray-50 border-t">
        <div className="flex items-center text-gray-500 space-x-2">
          <Icon name="location-pin" size="14" color="#6B7280" />
          <span className="text-xs truncate">
            {getLocationDisplay()}
          </span>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-3 space-y-3">
            {/* Mobile Search */}
            <div className="lg:hidden">
              <div className="flex items-center border rounded px-3 py-2 text-gray-500 relative">
                <input
                  type="text"
                  placeholder="Search for services..."
                  className="outline-none bg-transparent text-sm w-full pr-8"
                />
                <Icon 
                  name="search" 
                  size="16" 
                  color="#6B7280" 
                  className="absolute right-3"
                />
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex items-center space-x-3">
              <button className="flex-1 bg-[#1A2D7A] text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2">
                <Icon name="shopping-cart" size="18" color="white" />
                <span className="text-sm">Cart</span>
              </button>
              <button
                className="flex-1 bg-[#1A2D7A] text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
                onClick={onUserClick}
              >
                <Icon name="user" size="18" color="white" />
                <span className="text-sm">Profile</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
