import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alert-dropdown',
  imports: [FormsModule],
  template: `
      <span>{{ label() }}&nbsp;&nbsp;</span>
      <select class="select select-info mr-[0.5rem]" [(ngModel)]="selectedValue">
        @for (style of items(); track style.value) {
          <option [ngValue]="style.value">
            {{ style.text }}
          </option>
        }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDropdownComponent {
  label = input.required<string>();
  items = input.required<{ text: string, value: string }[]>();
  selectedValue = model.required<string>();
}
