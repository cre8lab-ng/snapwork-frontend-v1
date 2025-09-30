// Notification types
export type NotificationChannel = 'push' | 'sms' | 'whatsapp' | 'in-app';

export interface NotificationPreferences {
  channels: NotificationChannel[];
  bookingUpdates: boolean;
  promotions: boolean;
  reminders: boolean;
}

export interface NotificationPayload {
  title: string;
  message: string;
  type: 'booking_update' | 'promotion' | 'reminder' | 'system';
  data?: Record<string, string | number | boolean>;
  channels?: NotificationChannel[];
}

// Mock notification service
class NotificationService {
  private preferences: NotificationPreferences = {
    channels: ['push', 'in-app'],
    bookingUpdates: true,
    promotions: false,
    reminders: true
  };

  // Initialize notification service
  async initialize(): Promise<void> {
    try {
      // Request notification permission for push notifications
      if ('Notification' in window && Notification.permission === 'default') {
        await Notification.requestPermission();
      }
      
      // Initialize service worker for push notifications
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered:', registration);
      }
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
    }
  }

  // Send notification through specified channels
  async sendNotification(payload: NotificationPayload): Promise<void> {
    const channels = payload.channels || this.preferences.channels;
    
    for (const channel of channels) {
      try {
        switch (channel) {
          case 'push':
            await this.sendPushNotification(payload);
            break;
          case 'sms':
            await this.sendSMSNotification(payload);
            break;
          case 'whatsapp':
            await this.sendWhatsAppNotification(payload);
            break;
          case 'in-app':
            this.sendInAppNotification(payload);
            break;
        }
      } catch (error) {
        console.error(`Failed to send ${channel} notification:`, error);
      }
    }
  }

  // Push notification
  private async sendPushNotification(payload: NotificationPayload): Promise<void> {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(payload.title, {
        body: payload.message,
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        tag: payload.type,
        data: payload.data,
        requireInteraction: payload.type === 'booking_update'
      });

      notification.onclick = () => {
        window.focus();
        if (payload.data?.bookingId) {
          window.location.href = `/booking/track/${payload.data.bookingId}`;
        }
        notification.close();
      };

      // Auto close after 5 seconds for non-critical notifications
      if (payload.type !== 'booking_update') {
        setTimeout(() => notification.close(), 5000);
      }
    }
  }

  // SMS notification (mock implementation)
  private async sendSMSNotification(payload: NotificationPayload): Promise<void> {
    // In a real implementation, this would integrate with SMS service like Twilio
    console.log('SMS Notification:', {
      to: '+1234567890', // User's phone number
      message: `${payload.title}: ${payload.message}`,
      type: payload.type
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // WhatsApp notification (mock implementation)
  private async sendWhatsAppNotification(payload: NotificationPayload): Promise<void> {
    // In a real implementation, this would integrate with WhatsApp Business API
    console.log('WhatsApp Notification:', {
      to: '+1234567890', // User's WhatsApp number
      message: `*${payload.title}*\n\n${payload.message}`,
      type: payload.type
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // In-app notification (using toast or custom component)
  private sendInAppNotification(payload: NotificationPayload): void {
    // This would integrate with your toast system (react-hot-toast)
    const event = new CustomEvent('inAppNotification', {
      detail: payload
    });
    window.dispatchEvent(event);
  }

  // Update user preferences
  updatePreferences(preferences: Partial<NotificationPreferences>): void {
    this.preferences = { ...this.preferences, ...preferences };
    localStorage.setItem('notificationPreferences', JSON.stringify(this.preferences));
  }

  // Get current preferences
  getPreferences(): NotificationPreferences {
    const stored = localStorage.getItem('notificationPreferences');
    if (stored) {
      this.preferences = JSON.parse(stored);
    }
    return this.preferences;
  }

  // Booking-specific notification helpers
  async notifyBookingAccepted(bookingId: string, providerName: string): Promise<void> {
    await this.sendNotification({
      title: 'Booking Confirmed! 🎉',
      message: `${providerName} has accepted your booking and will be with you soon.`,
      type: 'booking_update',
      data: { bookingId, status: 'accepted' }
    });
  }

  async notifyProviderPreparing(bookingId: string, providerName: string): Promise<void> {
    await this.sendNotification({
      title: 'Getting Ready 🔧',
      message: `${providerName} is preparing for your service.`,
      type: 'booking_update',
      data: { bookingId, status: 'preparing' }
    });
  }

  async notifyProviderOnWay(bookingId: string, providerName: string, eta: string): Promise<void> {
    await this.sendNotification({
      title: 'On the Way! 🚗',
      message: `${providerName} is heading to your location. ETA: ${eta}`,
      type: 'booking_update',
      data: { bookingId, status: 'on-my-way', eta }
    });
  }

  async notifyProviderArrived(bookingId: string, providerName: string): Promise<void> {
    await this.sendNotification({
      title: 'Provider Arrived! 📍',
      message: `${providerName} has arrived at your location.`,
      type: 'booking_update',
      data: { bookingId, status: 'arrived' }
    });
  }

  async notifyQuoteReady(bookingId: string, amount: number): Promise<void> {
    await this.sendNotification({
      title: 'Quote Ready 💰',
      message: `Your provider has prepared a quote for $${amount}. Please review and approve.`,
      type: 'booking_update',
      data: { bookingId, status: 'quote-ready', amount }
    });
  }

  async notifyServiceInProgress(bookingId: string): Promise<void> {
    await this.sendNotification({
      title: 'Service Started ⚡',
      message: 'Your service is now in progress. You can track updates in real-time.',
      type: 'booking_update',
      data: { bookingId, status: 'in-progress' }
    });
  }

  async notifyServiceCompleted(bookingId: string): Promise<void> {
    await this.sendNotification({
      title: 'Service Completed! ✅',
      message: 'Your service has been completed. Please review and rate your experience.',
      type: 'booking_update',
      data: { bookingId, status: 'completed' }
    });
  }

  async notifyReminder(bookingId: string, service: string, time: string): Promise<void> {
    await this.sendNotification({
      title: 'Upcoming Service Reminder ⏰',
      message: `Your ${service} is scheduled for ${time}. Your provider will contact you soon.`,
      type: 'reminder',
      data: { bookingId, reminderType: 'upcoming-service' }
    });
  }
}

// Create singleton instance
export const notificationService = new NotificationService();

// Initialize on app start
if (typeof window !== 'undefined') {
  notificationService.initialize();
}

// Hook for React components
export const useNotifications = () => {
  return {
    sendNotification: notificationService.sendNotification.bind(notificationService),
    updatePreferences: notificationService.updatePreferences.bind(notificationService),
    getPreferences: notificationService.getPreferences.bind(notificationService),
    // Booking-specific helpers
    notifyBookingAccepted: notificationService.notifyBookingAccepted.bind(notificationService),
    notifyProviderPreparing: notificationService.notifyProviderPreparing.bind(notificationService),
    notifyProviderOnWay: notificationService.notifyProviderOnWay.bind(notificationService),
    notifyProviderArrived: notificationService.notifyProviderArrived.bind(notificationService),
    notifyQuoteReady: notificationService.notifyQuoteReady.bind(notificationService),
    notifyServiceInProgress: notificationService.notifyServiceInProgress.bind(notificationService),
    notifyServiceCompleted: notificationService.notifyServiceCompleted.bind(notificationService),
    notifyReminder: notificationService.notifyReminder.bind(notificationService)
  };
};