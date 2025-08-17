import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { AlertType } from '../alert.type';
import { AlertComponent } from '../alert/alert.component';
import { AlertBarComponent } from '../alert-bar/alert-bar.component';

@Component({
  selector: 'app-alert-list',
  imports: [AlertComponent, AlertBarComponent],
  template: `
    <app-alert-bar [config]="config()" />
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

  config = signal({
    styleLabel: "Alert styles:",
    styles: [
      { text: 'Default', value: 'color' },
      { text: 'Soft', value: 'soft' },
      { text: 'Outline', value: 'outline' },
      { text: 'Dash', value: 'dash' }
    ],
    directionLabel: "Alert direction:",
    directions: [
      { text: 'Horizontal', value: 'horizontal' },
      { text: 'Vertical', value: 'vertical' },
    ]
  })

  filteredAlerts = computed(() => 
    this.alerts().filter(alert => !this.closedNotifications().includes(alert.type))
  ); 

  handleCloseNotification(type: string) {
    this.closedNotifications.update((prev) => ([...prev, type ]));
  }
}
