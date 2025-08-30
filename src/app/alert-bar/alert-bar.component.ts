import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { capitalize } from '../capitalize';
import { OpenIconComponent } from '../icons/icon.component';

@Component({
  selector: 'app-alert-bar',
  imports: [FormsModule, OpenIconComponent],
  template: `
  <div>
    @let c = config();
    <p class="mb-[0.75rem]">
      <span>Has close button? </span>
      <input type="checkbox" class="mr-[0.5rem]" [(ngModel)]="hasCloseButton" />
      <span>{{ c.styleLabel }}&nbsp;&nbsp;</span>
      <select class="select select-info mr-[0.5rem]" [(ngModel)]="style">
        @for (style of c.styles; track style.value) {
          <option [ngValue]="style.value">
            {{ style.text }}
          </option>
        }
      </select>
      <span>{{ c.directionLabel }}&nbsp;&nbsp;</span>
      <select class="select select-info mr-[0.5rem]" [(ngModel)]="direction">
        @for (direction of c.directions; track direction.value) {
          <option [ngValue]="direction.value">
            {{ direction.text }}
          </option>
        }
      </select>
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
      @if (closedNotifications().length > 0) { 
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
}
