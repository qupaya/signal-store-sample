import {Component, computed, input} from '@angular/core';

@Component({
  selector: 'app-pogress-bar',
  standalone: true,
  imports: [],
  templateUrl: './pogress-bar.component.html',
  styleUrl: './pogress-bar.component.scss'
})
export class PogressBarComponent {
  value = input.required<number>();
  maxValue = input<number>(100);

  valueInPercent = computed(() => {
    const percent = Math.floor((this.value() / (this.maxValue() || 100)) * 100);
    return `${percent}%`;
  })
}
