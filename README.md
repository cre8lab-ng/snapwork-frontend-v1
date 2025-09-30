# Snapwork - On-Demand Service Platform

Snapwork is a comprehensive on-demand service platform that connects users with skilled service providers for various home and professional services.

## 🚀 Features

### 1. Service Discovery
- **Location-based Search**: Find services near your location
- **Service Categories**: Browse through various service categories (cleaning, electrical, plumbing, etc.)
- **Quick Match**: AI-powered provider matching based on your needs
- **Real-time Availability**: See available providers in your area

### 2. Provider Profiles
- **Detailed Profiles**: View provider information, ratings, and reviews
- **Photo Gallery**: Browse provider's previous work
- **Pricing Information**: Transparent pricing and service details
- **Instant Booking**: Book services directly from provider profiles

### 3. Booking System
- **Flexible Scheduling**: Choose date and time that works for you
- **Service Notes**: Add specific requirements and notes
- **Photo Upload**: Share photos to help providers understand your needs
- **Confirmation Flow**: Clear booking confirmation process

### 4. Payment Integration
- **Multiple Payment Methods**: Credit/debit cards, bank transfers, mobile money
- **Secure Processing**: PCI-compliant payment handling
- **Quote Approval**: Review and approve service quotes before payment
- **Invoice Generation**: Detailed invoices for all services

### 5. Real-time Tracking
- **Live Status Updates**: Track your service from booking to completion
- **GPS Tracking**: Real-time provider location when they're on the way
- **ETA Calculations**: Accurate arrival time estimates
- **Progress Photos**: Receive updates with photos during service delivery

### 6. Notification System
- **Multi-channel Notifications**: Push, SMS, WhatsApp, and in-app notifications
- **Customizable Preferences**: Choose how and when you want to be notified
- **Real-time Updates**: Instant notifications for booking status changes
- **Service Worker**: Background notifications even when app is closed

### 7. Post-Service Features
- **Rating & Reviews**: Rate providers and leave detailed reviews
- **Service History**: View all your past bookings and services
- **Rebooking**: Easily rebook your favorite providers
- **Favorites**: Save preferred providers for quick access
- **Digital Invoices**: Download and manage service invoices

## 🛠 Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Forms**: Formik + Yup validation
- **Icons**: Heroicons, Lucide React
- **Maps**: Google Maps API integration
- **Notifications**: React Hot Toast, Service Worker
- **Real-time**: Socket.io client
- **HTTP Client**: Axios

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to `http://localhost:3000` (or the port shown in terminal)

## 📱 Key Pages & Features

- **Home** (`/`): Service discovery with location search and quick match
- **Provider Profile** (`/provider/[id]`): Detailed provider info and booking
- **Booking Flow** (`/booking/*`): Complete booking, payment, and tracking
- **Service History** (`/history`): Past bookings and rebooking options

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file with:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_API_BASE_URL=your_api_base_url
```

## 📋 User Journey

1. **Discovery**: Search for services by location and category
2. **Provider Selection**: Browse and select from available providers
3. **Booking**: Schedule service with specific requirements
4. **Payment**: Secure payment processing with multiple options
5. **Tracking**: Real-time tracking of service delivery with GPS
6. **Completion**: Rate service and receive digital invoice
7. **History**: Access past bookings and rebook favorites

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop and mobile
- **Modern Interface**: Clean design with smooth animations
- **Real-time Updates**: Live status tracking and notifications
- **Accessibility**: WCAG compliant with proper ARIA labels

## 🔒 Security & Performance

- **Input Validation**: Comprehensive form validation
- **Secure Payment**: PCI-compliant payment processing
- **Code Splitting**: Automatic optimization with Next.js
- **GPS Privacy**: Secure location handling

Built with ❤️ for connecting people with quality service providers.
