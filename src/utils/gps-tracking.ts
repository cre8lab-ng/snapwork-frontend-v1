// GPS Tracking and ETA Calculation Utilities

export interface Location {
  lat: number;
  lng: number;
  accuracy?: number;
  timestamp?: number;
}

export interface RouteInfo {
  distance: number; // in meters
  duration: number; // in seconds
  eta: Date;
  polyline?: string;
}

export interface TrackingUpdate {
  providerId: string;
  bookingId: string;
  location: Location;
  heading?: number;
  speed?: number;
  timestamp: number;
}

// Mock Google Maps API integration
class GPSTrackingService {
  private watchId: number | null = null;
  private trackingCallbacks: Map<string, (update: TrackingUpdate) => void> = new Map();

  // Get current location
  async getCurrentLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          });
        },
        (error) => {
          reject(new Error(`Geolocation error: ${error.message}`));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  }

  // Start tracking location
  startTracking(
    providerId: string, 
    bookingId: string, 
    callback: (update: TrackingUpdate) => void
  ): void {
    if (!navigator.geolocation) {
      throw new Error('Geolocation is not supported');
    }

    this.trackingCallbacks.set(`${providerId}-${bookingId}`, callback);

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const update: TrackingUpdate = {
          providerId,
          bookingId,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          },
          heading: position.coords.heading || undefined,
          speed: position.coords.speed || undefined,
          timestamp: Date.now()
        };

        callback(update);
        
        // In real app, send to backend
        this.sendLocationUpdate(update);
      },
      (error) => {
        console.error('Location tracking error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 1000
      }
    );
  }

  // Stop tracking
  stopTracking(providerId: string, bookingId: string): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
    
    this.trackingCallbacks.delete(`${providerId}-${bookingId}`);
  }

  // Calculate distance between two points (Haversine formula)
  calculateDistance(point1: Location, point2: Location): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (point1.lat * Math.PI) / 180;
    const φ2 = (point2.lat * Math.PI) / 180;
    const Δφ = ((point2.lat - point1.lat) * Math.PI) / 180;
    const Δλ = ((point2.lng - point1.lng) * Math.PI) / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  // Get route information (mock implementation)
  async getRouteInfo(origin: Location, destination: Location): Promise<RouteInfo> {
    // In real implementation, this would use Google Maps Directions API
    const distance = this.calculateDistance(origin, destination);
    
    // Mock calculation: assume average speed of 30 km/h in city
    const averageSpeed = 30 * 1000 / 3600; // 30 km/h in m/s
    const duration = distance / averageSpeed;
    
    // Add some traffic factor (1.2x for city traffic)
    const adjustedDuration = duration * 1.2;
    
    const eta = new Date(Date.now() + adjustedDuration * 1000);

    return {
      distance,
      duration: adjustedDuration,
      eta,
      polyline: this.generateMockPolyline(origin, destination)
    };
  }

  // Calculate ETA based on current location and destination
  async calculateETA(
    currentLocation: Location, 
    destination: Location, 
    considerTraffic = true
  ): Promise<{ eta: Date; duration: number; distance: number }> {
    const routeInfo = await this.getRouteInfo(currentLocation, destination);
    
    if (considerTraffic) {
      // Mock traffic adjustment
      const trafficFactor = this.getTrafficFactor();
      const adjustedDuration = routeInfo.duration * trafficFactor;
      
      return {
        eta: new Date(Date.now() + adjustedDuration * 1000),
        duration: adjustedDuration,
        distance: routeInfo.distance
      };
    }

    return {
      eta: routeInfo.eta,
      duration: routeInfo.duration,
      distance: routeInfo.distance
    };
  }

  // Get traffic factor (mock implementation)
  private getTrafficFactor(): number {
    const hour = new Date().getHours();
    
    // Rush hour traffic (7-9 AM, 5-7 PM)
    if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) {
      return 1.5; // 50% longer due to traffic
    }
    
    // Regular traffic
    if (hour >= 6 && hour <= 22) {
      return 1.2; // 20% longer
    }
    
    // Night time - less traffic
    return 1.0;
  }

  // Format ETA for display
  formatETA(eta: Date): string {
    const now = new Date();
    const diffMs = eta.getTime() - now.getTime();
    const diffMinutes = Math.round(diffMs / (1000 * 60));

    if (diffMinutes < 1) {
      return 'Arriving now';
    } else if (diffMinutes === 1) {
      return '1 minute';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minutes`;
    } else {
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      return `${hours}h ${minutes}m`;
    }
  }

  // Format distance for display
  formatDistance(distanceInMeters: number): string {
    if (distanceInMeters < 1000) {
      return `${Math.round(distanceInMeters)}m`;
    } else {
      const km = distanceInMeters / 1000;
      return `${km.toFixed(1)}km`;
    }
  }

  // Generate mock polyline for route visualization
  private generateMockPolyline(origin: Location, destination: Location): string {
    // In real implementation, this would come from Google Maps API
    // This is a simplified mock polyline
    const points = [
      origin,
      {
        lat: origin.lat + (destination.lat - origin.lat) * 0.3,
        lng: origin.lng + (destination.lng - origin.lng) * 0.3
      },
      {
        lat: origin.lat + (destination.lat - origin.lat) * 0.7,
        lng: origin.lng + (destination.lng - origin.lng) * 0.7
      },
      destination
    ];

    // Encode points to polyline format (simplified)
    return points.map(p => `${p.lat.toFixed(6)},${p.lng.toFixed(6)}`).join('|');
  }

  // Send location update to backend (mock)
  private async sendLocationUpdate(update: TrackingUpdate): Promise<void> {
    try {
      // In real implementation, send to your backend API
      console.log('Sending location update:', update);
      
      // Mock API call
      await fetch('/api/tracking/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(update)
      });
    } catch (error) {
      console.error('Failed to send location update:', error);
    }
  }

  // Get mock provider location (for testing)
  getMockProviderLocation(bookingId: string): Location {
    // Mock provider locations for different bookings
    const mockLocations: Record<string, Location> = {
      '1': { lat: 40.7589, lng: -73.9851 }, // Times Square area
      '2': { lat: 40.7505, lng: -73.9934 }, // Near Empire State Building
      '3': { lat: 40.7614, lng: -73.9776 }, // Central Park area
    };

    return mockLocations[bookingId] || { lat: 40.7128, lng: -74.0060 }; // Default NYC
  }

  // Simulate provider movement (for testing)
  simulateProviderMovement(
    bookingId: string,
    destination: Location,
    onUpdate: (location: Location, eta: string) => void
  ): () => void {
    let currentLocation = this.getMockProviderLocation(bookingId);
    
    const interval = setInterval(async () => {
      // Move provider closer to destination
      const latDiff = destination.lat - currentLocation.lat;
      const lngDiff = destination.lng - currentLocation.lng;
      
      // Move 10% closer each update
      currentLocation = {
        lat: currentLocation.lat + latDiff * 0.1,
        lng: currentLocation.lng + lngDiff * 0.1,
        timestamp: Date.now()
      };

      // Calculate new ETA
      const etaInfo = await this.calculateETA(currentLocation, destination);
      const etaString = this.formatETA(etaInfo.eta);

      onUpdate(currentLocation, etaString);

      // Stop when very close to destination
      const distance = this.calculateDistance(currentLocation, destination);
      if (distance < 50) { // Within 50 meters
        clearInterval(interval);
        onUpdate(destination, 'Arrived');
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }
}

// Create singleton instance
export const gpsTrackingService = new GPSTrackingService();

// React hook for GPS tracking
export const useGPSTracking = () => {
  return {
    getCurrentLocation: gpsTrackingService.getCurrentLocation.bind(gpsTrackingService),
    startTracking: gpsTrackingService.startTracking.bind(gpsTrackingService),
    stopTracking: gpsTrackingService.stopTracking.bind(gpsTrackingService),
    calculateDistance: gpsTrackingService.calculateDistance.bind(gpsTrackingService),
    calculateETA: gpsTrackingService.calculateETA.bind(gpsTrackingService),
    formatETA: gpsTrackingService.formatETA.bind(gpsTrackingService),
    formatDistance: gpsTrackingService.formatDistance.bind(gpsTrackingService),
    simulateProviderMovement: gpsTrackingService.simulateProviderMovement.bind(gpsTrackingService)
  };
};