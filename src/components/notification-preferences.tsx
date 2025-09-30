import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { 
  BellIcon, 
  DevicePhoneMobileIcon, 
  ChatBubbleLeftRightIcon,
  ComputerDesktopIcon 
} from '@heroicons/react/24/outline';
import { useNotifications, NotificationPreferences, NotificationChannel } from '../utils/notifications';

interface NotificationPreferencesProps {
  onClose?: () => void;
}

const NotificationPreferencesComponent = ({ onClose }: NotificationPreferencesProps) => {
  const { getPreferences, updatePreferences } = useNotifications();
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    channels: ['push', 'in-app'],
    bookingUpdates: true,
    promotions: false,
    reminders: true
  });

  useEffect(() => {
    setPreferences(getPreferences());
  }, [getPreferences]);

  const handleChannelToggle = (channel: NotificationChannel) => {
    const newChannels = preferences.channels.includes(channel)
      ? preferences.channels.filter(c => c !== channel)
      : [...preferences.channels, channel];
    
    const newPreferences = { ...preferences, channels: newChannels };
    setPreferences(newPreferences);
    updatePreferences(newPreferences);
  };

  const handleTypeToggle = (type: keyof Omit<NotificationPreferences, 'channels'>) => {
    const newPreferences = { ...preferences, [type]: !preferences[type] };
    setPreferences(newPreferences);
    updatePreferences(newPreferences);
  };

  const getChannelIcon = (channel: NotificationChannel) => {
    switch (channel) {
      case 'push':
        return <BellIcon className="w-5 h-5" />;
      case 'sms':
        return <DevicePhoneMobileIcon className="w-5 h-5" />;
      case 'whatsapp':
        return <ChatBubbleLeftRightIcon className="w-5 h-5" />;
      case 'in-app':
        return <ComputerDesktopIcon className="w-5 h-5" />;
    }
  };

  const getChannelName = (channel: NotificationChannel) => {
    switch (channel) {
      case 'push':
        return 'Push Notifications';
      case 'sms':
        return 'SMS Messages';
      case 'whatsapp':
        return 'WhatsApp';
      case 'in-app':
        return 'In-App Notifications';
    }
  };

  const getChannelDescription = (channel: NotificationChannel) => {
    switch (channel) {
      case 'push':
        return 'Receive notifications on your device even when the app is closed';
      case 'sms':
        return 'Get text messages for important updates';
      case 'whatsapp':
        return 'Receive updates via WhatsApp messages';
      case 'in-app':
        return 'See notifications while using the app';
    }
  };

  const channels: NotificationChannel[] = ['push', 'sms', 'whatsapp', 'in-app'];

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">
          Notification Preferences
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      <div className="p-4 space-y-6">
        {/* Notification Channels */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            How would you like to receive notifications?
          </h3>
          <div className="space-y-3">
            {channels.map((channel) => (
              <div key={channel} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getChannelIcon(channel)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {getChannelName(channel)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {getChannelDescription(channel)}
                      </p>
                    </div>
                    <Switch
                      checked={preferences.channels.includes(channel)}
                      onChange={() => handleChannelToggle(channel)}
                      className={`${
                        preferences.channels.includes(channel)
                          ? 'bg-blue-600'
                          : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                      <span
                        className={`${
                          preferences.channels.includes(channel)
                            ? 'translate-x-6'
                            : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </Switch>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Types */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            What notifications would you like to receive?
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Booking Updates
                </p>
                <p className="text-xs text-gray-500">
                  Status changes, provider updates, and service progress
                </p>
              </div>
              <Switch
                checked={preferences.bookingUpdates}
                onChange={() => handleTypeToggle('bookingUpdates')}
                className={`${
                  preferences.bookingUpdates ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                <span
                  className={`${
                    preferences.bookingUpdates ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Reminders
                </p>
                <p className="text-xs text-gray-500">
                  Upcoming appointments and follow-up reminders
                </p>
              </div>
              <Switch
                checked={preferences.reminders}
                onChange={() => handleTypeToggle('reminders')}
                className={`${
                  preferences.reminders ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                <span
                  className={`${
                    preferences.reminders ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Promotions & Offers
                </p>
                <p className="text-xs text-gray-500">
                  Special deals, discounts, and promotional content
                </p>
              </div>
              <Switch
                checked={preferences.promotions}
                onChange={() => handleTypeToggle('promotions')}
                className={`${
                  preferences.promotions ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                <span
                  className={`${
                    preferences.promotions ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
          </div>
        </div>

        {/* Test Notification */}
        <div className="pt-4 border-t">
          <button
            onClick={() => {
              // Test notification
              if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('Test Notification', {
                  body: 'This is a test notification from Snapwork!',
                  icon: '/icon-192x192.png'
                });
              } else if ('Notification' in window) {
                Notification.requestPermission().then((permission) => {
                  if (permission === 'granted') {
                    new Notification('Test Notification', {
                      body: 'This is a test notification from Snapwork!',
                      icon: '/icon-192x192.png'
                    });
                  }
                });
              }
            }}
            className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Send Test Notification
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferencesComponent;