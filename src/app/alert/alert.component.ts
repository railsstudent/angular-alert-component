import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output, signal, viewChild, ViewContainerRef } from '@angular/core';
import { AlertType } from '../alert.type';
import { CloseIconComponent, ErrorIconComponent, InfoIconComponent, SuccessIconComponent, WarningIconComponent } from '../icons/icon.component';

@Component({
  selector: 'app-alert',
  imports: [NgComponentOutlet, CloseIconComponent],
  template: `
    @if (!closed()) {
      <div role="alert" [class]="alertClasses()">
        <ng-container [ngComponentOutlet]="icon()" />
        <span><ng-content /></span>
        @if (alertConfig().hasCloseButton) {
        <div>
          <button class="btn btn-sm btn-primary" alt="Close button" (click)="closeAlert()">
            <app-close-icon />
          </button>
        </div>
        }
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  type = input.required<AlertType>();

  alertConfig = input.required<{
    hasCloseButton: boolean
    style: string
    direction: string
  }>();
  
  alertColor = computed(() => {
    return {
        info: 'alert-info',
        warning: 'alert-warning',
        error: 'alert-error',
        success: 'alert-success'
    }[this.type()]
  });

  alertStyle = computed(() => {
    return {
        color: '',
        dash: 'alert-dash',
        soft: 'alert-soft',
        outline: 'alert-outline'
    }[this.alertConfig().style]
  });

  alertDirection = computed(() => {
    return {
        horizontal: 'alert-horizontal',
        vertical: 'alert-vertical',
    }[this.alertConfig().direction]
  });

  icon = computed(() => {
    return {
        info: InfoIconComponent,
        warning: WarningIconComponent,
        error: ErrorIconComponent,
        success: SuccessIconComponent,
    }[this.type()];
  });

  alertClasses = computed(() => `alert ${this.alertColor()} ${this.alertStyle()} ${this.alertDirection()}`);

  closed = signal(false);

  closeNotification = output<string>();

  closeAlert() {
    this.closed.set(true);
    this.closeNotification.emit(this.type());
  }
}
