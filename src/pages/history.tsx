import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ArrowPathIcon,
  HeartIcon,
  EyeIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

interface BookingHistoryItem {
  id: string;
  service: string;
  provider: {
    name: string;
    avatar: string;
    rating: number;
  };
  date: string;
  status: 'completed' | 'cancelled' | 'in-progress';
  amount: number;
  duration?: string;
  isFavorited: boolean;
  canRebook: boolean;
}

type FilterType = 'all' | 'completed' | 'cancelled' | 'in-progress';
type SortType = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';

const BookingHistory = () => {
  const router = useRouter();
  const [bookings, setBookings] = useState<BookingHistoryItem[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<BookingHistoryItem[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('date-desc');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock booking history data
    const mockBookings: BookingHistoryItem[] = [
      {
        id: '1',
        service: 'House Cleaning',
        provider: {
          name: 'Sarah Johnson',
          avatar: '/api/placeholder/40/40',
          rating: 4.9
        },
        date: '2024-01-15T14:00:00Z',
        status: 'completed',
        amount: 120,
        duration: '3 hours',
        isFavorited: true,
        canRebook: true
      },
      {
        id: '2',
        service: 'Plumbing Repair',
        provider: {
          name: 'Mike Wilson',
          avatar: '/api/placeholder/40/40',
          rating: 4.7
        },
        date: '2024-01-10T10:30:00Z',
        status: 'completed',
        amount: 85,
        duration: '1.5 hours',
        isFavorited: false,
        canRebook: true
      },
      {
        id: '3',
        service: 'Garden Maintenance',
        provider: {
          name: 'Green Thumb Co.',
          avatar: '/api/placeholder/40/40',
          rating: 4.8
        },
        date: '2024-01-08T09:00:00Z',
        status: 'cancelled',
        amount: 150,
        isFavorited: false,
        canRebook: true
      },
      {
        id: '4',
        service: 'Electrical Work',
        provider: {
          name: 'John Electric',
          avatar: '/api/placeholder/40/40',
          rating: 4.6
        },
        date: '2024-01-05T16:00:00Z',
        status: 'completed',
        amount: 200,
        duration: '2 hours',
        isFavorited: true,
        canRebook: true
      },
      {
        id: '5',
        service: 'Carpet Cleaning',
        provider: {
          name: 'Fresh Clean Services',
          avatar: '/api/placeholder/40/40',
          rating: 4.5
        },
        date: '2024-01-03T13:00:00Z',
        status: 'completed',
        amount: 95,
        duration: '2.5 hours',
        isFavorited: false,
        canRebook: true
      }
    ];

    setBookings(mockBookings);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = [...bookings];

    // Apply filter
    if (filter !== 'all') {
      filtered = filtered.filter(booking => booking.status === filter);
    }

    // Apply sort
    filtered.sort((a, b) => {
      switch (sort) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'amount-desc':
          return b.amount - a.amount;
        case 'amount-asc':
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

    setFilteredBookings(filtered);
  }, [bookings, filter, sort]);

  const handleFavorite = (bookingId: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, isFavorited: !booking.isFavorited }
        : booking
    ));
  };

  const handleRebook = (booking: BookingHistoryItem) => {
    // Navigate to provider page or booking flow
    router.push(`/provider/${booking.provider.name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleViewDetails = (bookingId: string) => {
    router.push(`/booking/complete/${bookingId}`);
  };

  const getStatusIcon = (status: BookingHistoryItem['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      case 'in-progress':
        return <ClockIcon className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusText = (status: BookingHistoryItem['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      case 'in-progress':
        return 'In Progress';
    }
  };

  const getStatusColor = (status: BookingHistoryItem['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      case 'in-progress':
        return 'text-blue-600 bg-blue-50';
    }
  };

  if (loading) {
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
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>
            <h1 className="text-lg font-semibold">Booking History</h1>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-gray-600 hover:text-gray-900"
            >
              <FunnelIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="space-y-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['all', 'completed', 'cancelled', 'in-progress'] as FilterType[]).map((filterOption) => (
                    <button
                      key={filterOption}
                      onClick={() => setFilter(filterOption)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        filter === filterOption
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filterOption === 'all' ? 'All' : filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort by
                </label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="date-desc">Date (Newest First)</option>
                  <option value="date-asc">Date (Oldest First)</option>
                  <option value="amount-desc">Amount (High to Low)</option>
                  <option value="amount-asc">Amount (Low to High)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {bookings.filter(b => b.status === 'completed').length}
            </p>
            <p className="text-xs text-gray-600">Completed</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              ${bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.amount, 0)}
            </p>
            <p className="text-xs text-gray-600">Total Spent</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">
              {bookings.filter(b => b.isFavorited).length}
            </p>
            <p className="text-xs text-gray-600">Favorites</p>
          </div>
        </div>

        {/* Booking List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <ClockIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-4">
                {filter === 'all' 
                  ? "You haven't made any bookings yet."
                  : `No ${filter} bookings found.`
                }
              </p>
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Book a Service
              </button>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-start space-x-3">
                  <Image
                    src={booking.provider.avatar}
                    alt={booking.provider.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {booking.service}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {booking.provider.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(booking.date).toLocaleDateString()} at{' '}
                          {new Date(booking.date).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                        {booking.duration && (
                          <p className="text-xs text-gray-500">
                            Duration: {booking.duration}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${booking.amount}
                        </p>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1">{getStatusText(booking.status)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetails(booking.id)}
                          className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
                        >
                          <EyeIcon className="w-4 h-4" />
                          <span>Details</span>
                        </button>
                        {booking.canRebook && (
                          <button
                            onClick={() => handleRebook(booking)}
                            className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
                          >
                            <ArrowPathIcon className="w-4 h-4" />
                            <span>Rebook</span>
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => handleFavorite(booking.id)}
                        className={`p-1 rounded-full transition-colors ${
                          booking.isFavorited
                            ? 'text-red-500 hover:text-red-600'
                            : 'text-gray-400 hover:text-red-500'
                        }`}
                      >
                        {booking.isFavorited ? (
                          <HeartSolid className="w-5 h-5" />
                        ) : (
                          <HeartIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More (if needed) */}
        {filteredBookings.length > 0 && (
          <div className="mt-6 text-center">
            <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;