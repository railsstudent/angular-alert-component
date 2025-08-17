import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { CloseIconComponent, ErrorIconComponent, InfoIconComponent, SuccessIconComponent, WarningIconComponent } from '../icon/icon.component';
import { NgComponentOutlet } from '@angular/common';
import { AlertType } from '../alert.type';

@Component({
  selector: 'app-alert',
  imports: [NgComponentOutlet, CloseIconComponent],
  template: `
    @if (!closed()) {
      <div role="alert" [class]="alertClasses()">
        <ng-container [ngComponentOutlet]="icon()"></ng-container>
        <span><ng-content /></span>
        <div v-if="alertConfig.hasCloseButton">
          <button class="btn btn-sm btn-primary" alt="Close button" (click)="closeAlert()">
            <app-close-icon />
          </button>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  type = input.required<AlertType>();

  icon = computed(() => {
    if (this.type() === 'info') {
      return InfoIconComponent;
    } else if (this.type() === 'success') {
      return SuccessIconComponent;
    } else if (this.type() === 'warning') {
      return WarningIconComponent;
    } else if (this.type() === 'error') {
      return ErrorIconComponent;
    }

    return InfoIconComponent;
  });

  alertClasses = computed(() => `alert alert-${this.type()}`);

  closed = signal(false);

  closeNotification = output<string>();

  closeAlert() {
    this.closed.set(true);
    this.closeNotification.emit(this.type());
  }
}
