import {Component, input, signal} from '@angular/core';

@Component({
  selector: 'app-evolution-chain',
  standalone: true,
  imports: [],
  templateUrl: './evolution-chain.component.html',
  styleUrl: './evolution-chain.component.scss'
})
export class EvolutionChainComponent {
  readonly evolutionChain = signal<{ id: number, name: string }[]>([]);
  readonly id = input.required<number>();
}
