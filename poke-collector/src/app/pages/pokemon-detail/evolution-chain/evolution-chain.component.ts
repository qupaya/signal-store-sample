import {Component, inject} from '@angular/core';
import {pokeCollectorStore} from "../../../app.store";

@Component({
  selector: 'app-evolution-chain',
  standalone: true,
  imports: [],
  templateUrl: './evolution-chain.component.html',
  styleUrl: './evolution-chain.component.scss'
})
export class EvolutionChainComponent {
  private readonly store = inject(pokeCollectorStore);
  readonly evolutionChain = this.store.selectedPokemonEvolutionChain;
  readonly id = this.store.selectedPokemonId;
}
