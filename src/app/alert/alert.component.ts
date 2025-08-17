import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ErrorIconComponent, InfoIconComponent, SuccessIconComponent, WarningIconComponent } from '../icon/icon.component';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-alert',
  imports: [NgComponentOutlet],
  template: `
    <div role="alert" [class]="alertClasses()">
      <ng-container [ngComponentOutlet]="icon()"></ng-container>
      <span><ng-content /></span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  type = input.required<'info' | 'success' | 'warning' | 'error'>();

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
}
