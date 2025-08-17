import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AlertListComponent } from './alert-list/alert-list.component';
import { AlertType } from './alert.type';

@Component({
  selector: 'app-root',
  imports: [AlertListComponent],
  template: `
<main>
  <app-alert-list [alerts]="alerts()" />
</main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  alerts = signal<{ type: AlertType, message: string }[]>([
    { 
      type: 'info',
      message: 'New software update available.'
    }, 
    { 
      type: 'success',
      message: 'Your purchase has been confirmed!'
    }, 
    { 
      type: 'warning',
      message: 'Warning: Invalid email address!'
    }, 
    { 
      type: 'error',
      message: 'Error! Task failed successfully.'
    }])
}
