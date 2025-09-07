import { ChangeDetectionStrategy, Component, inject, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertDropdownComponent } from '../alert-dropdown/alert-dropdown.component';
import { capitalize } from '../capitalize';
import { OpenIconComponent } from '../icons/icon.component';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-alert-bar',
  imports: [FormsModule, OpenIconComponent, AlertDropdownComponent],
  template: `
  <div>
    @let c = config();
    <p class="mb-[0.75rem]">
      <span>Has close button? </span>
      <input type="checkbox" class="mr-[0.5rem]" [(ngModel)]="hasCloseButton" />
      <app-alert-dropdown [label]="c.styleLabel" [items]="c.styles"  [(selectedValue)]="style" />
      <app-alert-dropdown [label]="c.directionLabel" [items]="c.directions" [(selectedValue)]="direction" />
    </p>
    <p class="mb-[0.75rem]">
      @for (type of closedNotifications(); track type) {
        <button class="mr-[0.5rem] btn" [class]="getBtnClass(type)" (click)="remove(type)">
          <app-open-icon />{{ capitalize(type) }}
        </button>
      }
      @if (isNonEmpty()) { 
        <button class="btn btn-primary" (click)="removeAll()">
          Open all alerts
        </button>
      }
    </p>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertBarComponent {
  notificationService = inject(NotificationsService);

  config = input.required<{ 
    styleLabel: string
    styles: { text: string, value: string }[]
    directionLabel: string
    directions: { text: string, value: string }[]
  }>();

  hasCloseButton = model<boolean>(true);
  style = model<string>('color');
  direction = model<string>('horizontal');
  closedNotifications = this.notificationService.closedNotifications;

  capitalize = capitalize;

  getBtnClass(type: string) {
    return {
        info: 'btn-info',
        warning: 'btn-warning',
        error: 'btn-error',
        success: 'btn-success'
    }[type]
  }

  remove(type: string) {
    this.notificationService.remove(type);
  }

  removeAll() {
    this.notificationService.removeAll();
  }

  isNonEmpty() {
    return this.notificationService.isNonEmpty();
  }
}
