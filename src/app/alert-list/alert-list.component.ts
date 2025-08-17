import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { AlertType } from '../alert.type';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-alert-list',
  imports: [AlertComponent],
  template: ` 
    @for (alert of filteredAlerts(); track alert.type) {
      <app-alert [type]='alert.type' (closeNotification)="handleCloseNotification($event)">
        {{ alert.message }}
      </app-alert>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertListComponent {
  alerts = input.required<{ type: AlertType; message: string }[]>();

  closedNotifications = signal<string[]>([]);

  filteredAlerts = computed(() => 
    this.alerts().filter(alert => !this.closedNotifications().includes(alert.type))
  ); 

  handleCloseNotification(type: string) {
    this.closedNotifications.update((prev) => ([...prev, type ]));
  }
}
