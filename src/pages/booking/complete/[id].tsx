import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { 
  StarIcon, 
  HeartIcon, 
  ArrowPathIcon,
  DocumentTextIcon,
  ShareIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid, HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

interface ServiceItem {
  name: string;
  quantity: number;
  price: number;
}

interface Invoice {
  id: string;
  bookingId: string;
  service: string;
  provider: {
    name: string;
    avatar: string;
    businessName?: string;
  };
  items: ServiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  completedAt: string;
  duration: string;
  paymentMethod: string;
}

interface Review {
  rating: number;
  comment: string;
  categories: {
    quality: number;
    punctuality: number;
    professionalism: number;
    value: number;
  };
}

const ServiceComplete = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [review, setReview] = useState<Review>({
    rating: 0,
    comment: '',
    categories: {
      quality: 0,
      punctuality: 0,
      professionalism: 0,
      value: 0
    }
  });
  const [isFavorited, setIsFavorited] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    if (id) {
      // Mock invoice data
      const mockInvoice: Invoice = {
        id: `INV-${id}`,
        bookingId: id as string,
        service: 'House Cleaning',
        provider: {
          name: 'Sarah Johnson',
          avatar: '/api/placeholder/60/60',
          businessName: 'Sparkle Clean Services'
        },
        items: [
          { name: 'Deep Kitchen Cleaning', quantity: 1, price: 80 },
          { name: 'Bathroom Cleaning (2 rooms)', quantity: 2, price: 30 },
          { name: 'Living Room & Bedrooms', quantity: 1, price: 60 },
          { name: 'Additional Supplies', quantity: 1, price: 15 }
        ],
        subtotal: 185,
        tax: 14.8,
        total: 199.8,
        completedAt: new Date().toISOString(),
        duration: '3 hours 15 minutes',
        paymentMethod: 'Credit Card ending in 4567'
      };
      
      setInvoice(mockInvoice);
    }
  }, [id]);

  const handleRatingChange = (rating: number) => {
    setReview(prev => ({ ...prev, rating }));
  };

  const handleCategoryRating = (category: keyof Review['categories'], rating: number) => {
    setReview(prev => ({
      ...prev,
      categories: { ...prev.categories, [category]: rating }
    }));
  };

  const handleSubmitReview = async () => {
    if (review.rating === 0) {
      alert('Please provide an overall rating');
      return;
    }

    setIsSubmittingReview(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmittingReview(false);
    setReviewSubmitted(true);
    
    // Show success message
    setTimeout(() => {
      alert('Thank you for your review! Your feedback helps us improve our services.');
    }, 500);
  };

  const handleRebook = () => {
    if (invoice) {
      router.push(`/provider/${invoice.provider.name.toLowerCase().replace(' ', '-')}`);
    }
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    // In real app, this would save to user's favorites
  };

  const handleShareInvoice = () => {
    if (navigator.share && invoice) {
      navigator.share({
        title: `Snapwork Invoice - ${invoice.service}`,
        text: `Service completed by ${invoice.provider.name}`,
        url: window.location.href
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Invoice link copied to clipboard!');
    }
  };

  const handleDownloadInvoice = () => {
    // In real app, this would generate and download PDF
    alert('Invoice download started!');
  };

  const renderStars = (rating: number, onRate?: (rating: number) => void, size = 'w-6 h-6') => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRate && onRate(star)}
            disabled={!onRate}
            className={`${onRate ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            {star <= rating ? (
              <StarSolid className={`${size} text-yellow-400`} />
            ) : (
              <StarIcon className={`${size} text-gray-300`} />
            )}
          </button>
        ))}
      </div>
    );
  };

  if (!invoice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Home
            </button>
            <h1 className="text-lg font-semibold">Service Complete</h1>
            <button
              onClick={handleShareInvoice}
              className="text-gray-600 hover:text-gray-900"
            >
              <ShareIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <CheckCircleIcon className="w-8 h-8 text-green-500" />
            <div>
              <h2 className="text-lg font-semibold text-green-900">
                Service Completed!
              </h2>
              <p className="text-sm text-green-700">
                Your {invoice.service.toLowerCase()} has been completed successfully.
              </p>
            </div>
          </div>
        </div>

        {/* Provider Info & Actions */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center space-x-4 mb-4">
            <Image
              src={invoice.provider.avatar}
              alt={invoice.provider.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">
                {invoice.provider.name}
              </h3>
              {invoice.provider.businessName && (
                <p className="text-sm text-gray-600">
                  {invoice.provider.businessName}
                </p>
              )}
              <p className="text-xs text-gray-500">
                Completed {new Date(invoice.completedAt).toLocaleDateString()} • {invoice.duration}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleRebook}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <ArrowPathIcon className="w-4 h-4" />
              <span>Book Again</span>
            </button>
            <button
              onClick={handleFavorite}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                isFavorited
                  ? 'bg-red-50 border-red-200 text-red-600'
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {isFavorited ? (
                <HeartSolid className="w-5 h-5" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Rating & Review */}
        {!reviewSubmitted ? (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Rate Your Experience</h3>
            
            {/* Overall Rating */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Overall Rating</p>
              {renderStars(review.rating, handleRatingChange, 'w-8 h-8')}
            </div>

            {/* Category Ratings */}
            <div className="space-y-4 mb-6">
              {Object.entries(review.categories).map(([category, rating]) => (
                <div key={category}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-gray-600 capitalize">
                      {category === 'value' ? 'Value for Money' : category}
                    </p>
                    {renderStars(rating, (r) => handleCategoryRating(category as keyof Review['categories'], r), 'w-5 h-5')}
                  </div>
                </div>
              ))}
            </div>

            {/* Comment */}
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">
                Share your experience (optional)
              </label>
              <textarea
                value={review.comment}
                onChange={(e) => setReview(prev => ({ ...prev, comment: e.target.value }))}
                placeholder="Tell others about your experience..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitReview}
              disabled={isSubmittingReview || review.rating === 0}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-center">
              <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Review Submitted!</h3>
              <p className="text-sm text-gray-600">
                Thank you for your feedback. Your review helps other users make informed decisions.
              </p>
            </div>
          </div>
        )}

        {/* Invoice */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Invoice</h3>
            <button
              onClick={handleDownloadInvoice}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
            >
              <DocumentTextIcon className="w-4 h-4" />
              <span className="text-sm">Download</span>
            </button>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Invoice #:</span>
              <span className="font-medium">{invoice.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Service:</span>
              <span className="font-medium">{invoice.service}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">
                {new Date(invoice.completedAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium">{invoice.duration}</span>
            </div>
          </div>

          {/* Service Items */}
          <div className="border-t pt-4 mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Services Provided</h4>
            <div className="space-y-2">
              {invoice.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <div>
                    <span className="text-gray-900">{item.name}</span>
                    {item.quantity > 1 && (
                      <span className="text-gray-500 ml-1">x{item.quantity}</span>
                    )}
                  </div>
                  <span className="font-medium">${item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">${invoice.subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax:</span>
              <span className="font-medium">${invoice.tax}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold border-t pt-2">
              <span>Total:</span>
              <span>${invoice.total}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-gray-500">
              Paid via {invoice.paymentMethod}
            </p>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              Report an Issue
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              Contact Support
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              View Booking History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceComplete;