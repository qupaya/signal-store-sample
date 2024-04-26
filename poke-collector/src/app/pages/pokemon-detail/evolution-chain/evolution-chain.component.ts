import {Component, input} from '@angular/core';

@Component({
  selector: 'app-evolution-chain',
  standalone: true,
  imports: [],
  templateUrl: './evolution-chain.component.html',
  styleUrl: './evolution-chain.component.scss'
})
export class EvolutionChainComponent {
  readonly evolutionChain = input<{ id: number, name: string }[]>([]);
  readonly id = input.required<number>();
}
