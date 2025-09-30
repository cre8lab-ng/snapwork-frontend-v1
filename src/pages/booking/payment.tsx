import { useState } from 'react';
import { useRouter } from 'next/router';
import { CreditCardIcon, BanknotesIcon, DevicePhoneMobileIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import WebPageTitle from '@/components/webpagetitle';
import Navbar from '@/components/navbar';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

export default function BookingPayment() {
  const router = useRouter();
  const { bookingId } = router.query;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCardIcon className="h-6 w-6" />,
      description: 'Visa, Mastercard, Verve'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: <BanknotesIcon className="h-6 w-6" />,
      description: 'Direct bank transfer'
    },
    {
      id: 'mobile',
      name: 'Mobile Money',
      icon: <DevicePhoneMobileIcon className="h-6 w-6" />,
      description: 'MTN, Airtel, Glo, 9mobile'
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Redirect to tracking page after success
      setTimeout(() => {
        router.push(`/booking/tracking?bookingId=${bookingId}`);
      }, 3000);
    }, 3000);
  };

  if (paymentSuccess) {
    return (
      <>
        <WebPageTitle title="Payment Successful | Snapwork" />
        <Navbar onUserClick={() => {}} />
        
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
              <p className="text-gray-600 mb-6">
                Your booking has been confirmed. You will receive updates about your service provider.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-green-800">
                  <strong>Booking ID:</strong> {bookingId}
                </p>
              </div>
              <p className="text-sm text-gray-500">
                Redirecting to tracking page...
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <WebPageTitle title="Payment | Snapwork" />
      <Navbar onUserClick={() => {}} />
      
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Payment</h1>
          <p className="text-gray-600">Choose your preferred payment method</p>
        </div>

        {/* Booking Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Booking ID</span>
              <span className="font-medium">{bookingId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service</span>
              <span className="font-medium">Electrical Repair</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Provider</span>
              <span className="font-medium">John Electrician</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time</span>
              <span className="font-medium">Today, 2:00 PM</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-lg font-semibold">
              <span>Total Amount</span>
              <span className="text-blue-600">₦9,000</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
                  selectedPaymentMethod === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={selectedPaymentMethod === method.id}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="sr-only"
                />
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    selectedPaymentMethod === method.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {method.icon}
                  </div>
                  <div>
                    <p className="font-medium">{method.name}</p>
                    <p className="text-sm text-gray-500">{method.description}</p>
                  </div>
                </div>
                {selectedPaymentMethod === method.id && (
                  <CheckCircleIcon className="h-5 w-5 text-blue-600 ml-auto" />
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Card Details Form */}
        {selectedPaymentMethod === 'card' && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Card Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                    placeholder="MM/YY"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                    placeholder="123"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                  placeholder="John Doe"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <ShieldCheckIcon className="h-5 w-5 text-green-600 mr-2" />
            <p className="text-sm text-green-800">
              Your payment information is encrypted and secure. We never store your card details.
            </p>
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={!selectedPaymentMethod || isProcessing}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing Payment...
            </>
          ) : (
            `Pay ₦9,000`
          )}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          By proceeding, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </>
  );
}