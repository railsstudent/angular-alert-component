import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AlertListComponent } from './alert-list/alert-list.component';
import { AlertType } from './alert.type';
import { ALERTS } from './app.const';



@Component({
  selector: 'app-root',
  imports: [AlertListComponent],
  template: `
<div id="app">
  <main>
    <app-alert-list [alerts]="alerts()" />
  </main>
</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    #app {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      font-weight: 400;
    }
  `
})
export class AppComponent {
  alerts = signal<{ type: AlertType, message: string }[]>(ALERTS)
}
