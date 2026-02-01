import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor() { }

  requestPermission(): Promise<NotificationPermission> {
    return Notification.requestPermission();
  }

  showNotification(title: string, options?: NotificationOptions) {
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then(reg => {
        reg?.showNotification(title, options);
      });
    }
  }
}
