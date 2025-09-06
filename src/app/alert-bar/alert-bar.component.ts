import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { capitalize } from '../capitalize';
import { OpenIconComponent } from '../icons/icon.component';
import { AlertDropdownComponent } from '../alert-dropdown/alert-dropdown.component';

@Component({
  selector: 'app-alert-bar',
  imports: [FormsModule, OpenIconComponent, AlertDropdownComponent],
  template: `
  <div>
    @let c = config();
    <p class="mb-[0.75rem]">
      <span>Has close button? </span>
      <input type="checkbox" class="mr-[0.5rem]" [(ngModel)]="hasCloseButton" />
      <app-alert-dropdown 
        [label]="c.styleLabel" 
        [items]="c.styles"  
        [(selectedValue)]="style" 
      />
      <app-alert-dropdown 
        [label]="c.directionLabel" 
        [items]="c.directions" 
        [(selectedValue)]="direction" 
      />
    </p>
    <p class="mb-[0.75rem]">
      @for (type of closedNotifications(); track type) {
        <button 
          class="mr-[0.5rem] btn"
          [class]="getBtnClass(type)"
          (click)="removeNotification(type)"
        >
          <app-open-icon />{{ capitalize(type) }}
        </button>
      }
      @if (hasCloseButtonChanged()) { 
        <button
          class="btn btn-primary" 
          (click)="clearAllNotifications()">
          Open all alerts
        </button>
      }
    </p>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertBarComponent {
  config = input.required<{ 
    styleLabel: string
    styles: { text: string, value: string }[]
    directionLabel: string
    directions: { text: string, value: string }[]
  }>();

  hasCloseButton = model<boolean>(true);
  style = model<string>('color');
  direction = model<string>('horizontal');
  closedNotifications = model<string[]>([]);

  capitalize = capitalize;

  getBtnClass(type: string) {
    return {
        info: 'btn-info',
        warning: 'btn-warning',
        error: 'btn-error',
        success: 'btn-success'
    }[type]
  }

  removeNotification(type: string) {
    this.closedNotifications.update((prev) => prev.filter((t) => t !== type));
  }

  clearAllNotifications() {
    this.closedNotifications.set([])
  }

  hasCloseButtonChanged() {
    return this.closedNotifications().length > 0;
  }
}
