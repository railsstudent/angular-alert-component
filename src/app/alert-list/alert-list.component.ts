import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-alert-list',
  imports: [AlertComponent],
  template: ` 
    <app-alert type='info'>
      New software update available.
    </app-alert>
    <app-alert type='success'>
      Your purchase has been confirmed!
    </app-alert>
    <app-alert type='warning'>
      Warning: Invalid email address!
    </app-alert>
    <app-alert type='error'>
      Error! Task failed successfully. 
    </app-alert>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertListComponent {}
