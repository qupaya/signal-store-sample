import {Component, computed, input} from '@angular/core';
import {PogressBarComponent} from "../../../components/pogress-bar/pogress-bar.component";
import {Pokemon} from "../../../models/pokemon";

@Component({
  selector: 'app-pokemon-stats',
  standalone: true,
  imports: [
    PogressBarComponent
  ],
  templateUrl: './pokemon-stats.component.html',
  styleUrl: './pokemon-stats.component.scss'
})
export class PokemonStatsComponent {
  readonly pokemonDetails = input.required<Pokemon>();

  readonly pokemonStats = computed(() => {
    const stats = this.pokemonDetails()?.pokemon_v2_pokemonspecy?.pokemons[0]?.pokemonStats;
    return stats?.length ? stats.map(stat => ({
      id: stat.stat.id,
      name: stat.stat.statNames[0].name,
      value: stat.base_stat,
      maxValue: stat.stat.statAggregate.aggregate.max.base_stat
    })) : [];
  });
}
