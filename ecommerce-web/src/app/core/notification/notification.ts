import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from './service';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class NotificationComponent implements OnInit {

  notification: Notification | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notification$
      .subscribe(notification => {
        this.notification = notification;
      });
  }

  cerrar(): void {
    this.notificationService.clear();
  }

}
