import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor() { }

  requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.warn('Notifications are not supported by this browser.');
      return Promise.resolve('denied');
    }
    return Notification.requestPermission();
  }

  showNotification(title: string, options?: NotificationOptions) {
    if (!('Notification' in window)) {
      return;
    }

    if (Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then(reg => {
        // Use ServiceWorker registration if available (Standard PWA behavior)
        if (reg && reg.active) {
          reg.showNotification(title, options).catch(err => console.error('Error showing SW notification:', err));
        } else {
          // Fallback for development or environments without active SW
          try {
            new Notification(title, options);
          } catch (e) {
            console.error('Error showing fallback notification:', e);
          }
        }
      });
    }
  }
}
