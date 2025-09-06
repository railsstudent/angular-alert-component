import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { AlertBarComponent } from '../alert-bar/alert-bar.component';
import { AlertType } from '../alert.type';
import { AlertComponent } from '../alert/alert.component';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-alert-list',
  imports: [AlertComponent, AlertBarComponent],
  template: `
    <app-alert-bar 
      [config]="config()" 
      [(style)]="style" 
      [(direction)]="direction"
      [(hasCloseButton)]="hasCloseButton" 
    />
    @for (alert of filteredAlerts(); track alert.type) {
      <app-alert [type]="alert.type" 
        [alertConfig]="alertConfig()"
        (closeNotification)="add($event)">
        {{ alert.message }}
      </app-alert>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertListComponent {
  notificationService = inject(NotificationsService);
  
  alerts = input.required<{ type: AlertType; message: string }[]>();

  style = signal<string>('color');
  direction = signal<string>('horizontal');
  hasCloseButton = signal<boolean>(true);

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
    this.alerts().filter(alert => 
      !this.notificationService.closedNotifications().includes(alert.type))
  ); 

  alertConfig = computed(() => ({
    hasCloseButton: this.hasCloseButton(),
    style: this.style(),
    direction: this.direction()
  }));

  add(type: string) {
    this.notificationService.add(type);
  }
}
