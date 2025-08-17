import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AlertListComponent } from './alert-list/alert-list.component';

@Component({
  selector: 'app-root',
  imports: [AlertListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
