import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Snapwork</span>
            </div>
          </div>

          {/* Locations Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              LOCATIONS
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/locations/kubwa-nysc-camp" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Kubwa Nysc camp
                </Link>
              </li>
              <li>
                <Link href="/locations/achimota" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Achimota
                </Link>
              </li>
              <li>
                <Link href="/locations/kwabenya-ashongman" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Kwabenya-Ashongman
                </Link>
              </li>
              <li>
                <Link href="/locations/lokogoma" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Lokogoma
                </Link>
              </li>
              <li>
                <Link href="/locations/makurdi" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Makurdi
                </Link>
              </li>
              <li>
                <Link href="/locations/jos" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Jos
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200">
                  See more
                </Link>
              </li>
            </ul>
          </div>

          {/* Download Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              DOWNLOAD
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="https://play.google.com/store" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Google Play Store
                </Link>
              </li>
              <li>
                <Link href="https://apps.apple.com" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  iOS App Store
                </Link>
              </li>
            </ul>

            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 mt-8">
              GET HELP
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="mailto:support@snapwork.com" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Email
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              LEGAL
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy-policy" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Terms of use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024, Snapwork.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link 
                href="https://facebook.com" 
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-5 h-5" />
              </Link>
              <Link 
                href="https://instagram.com" 
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </Link>
              <Link 
                href="https://twitter.com" 
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;