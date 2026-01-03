import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type NotificationType = 'success' | 'error' | 'info';

export interface Notification {
  message: string;
  type: NotificationType;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  private notificationsSubject = new BehaviorSubject<Notification | null>(null);
  notification$ = this.notificationsSubject.asObservable();

  success(message: string): void {
    this.notificationsSubject.next({message, type: 'success'});
  }

  error(message: string): void {
    this.notificationsSubject.next({ message, type: 'error'});
  }

  info(message: string): void {
    this.notificationsSubject.next({ message, type: 'info'});
  }

  clear(): void {
    this.notificationsSubject.next(null);
  }

}
