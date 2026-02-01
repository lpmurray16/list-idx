import { Component, HostListener, ElementRef } from '@angular/core';
import { PushNotificationService } from '../../services/push-notification.service';

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss']
})
export class ActionMenuComponent {
  isOpen = false;

  constructor(
    private pushNotificationService: PushNotificationService,
    private elementRef: ElementRef
  ) {}

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  requestNotificationPermission() {
    this.pushNotificationService.requestPermission();
    this.isOpen = false; // Close menu after action
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
