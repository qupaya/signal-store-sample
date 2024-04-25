import {Component, computed, inject, input, numberAttribute, signal} from '@angular/core';
import {MatProgressBar} from "@angular/material/progress-bar";
import {PogressBarComponent} from "../../components/pogress-bar/pogress-bar.component";
import {EvolutionChainComponent} from "./evolution-chain/evolution-chain.component";
import {PokemonStatsComponent} from "./pokemon-stats/pokemon-stats.component";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Pokemon} from "../../models/pokemon";
import {toObservable} from "@angular/core/rxjs-interop";
import {ApiService} from "../../services/api.service";
import {switchMap, tap} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    MatProgressBar,
    PogressBarComponent,
    EvolutionChainComponent,
    PokemonStatsComponent,
    MatIconButton,
    MatIcon,
    AsyncPipe
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})
export class PokemonDetailComponent {
  private readonly apiService = inject(ApiService);
  pokemonId = input.required<number, unknown>({transform: numberAttribute});
  private readonly pokemonId$ = toObservable(this.pokemonId);
  private readonly pokemonDetails = signal<Pokemon | undefined>(undefined);

  readonly pokemon$ = this.pokemonId$.pipe(
    switchMap(id => this.apiService.loadPokemonDetails(id)),
    tap((pokemon) => this.pokemonDetails.set(pokemon)),
  )

  readonly pokemonHeight = computed(() => {
    const species = this.pokemonDetails()?.pokemon_v2_pokemonspecy?.pokemons;
    if (species) {
      const height = species[0].height;
      const meter = height ? height / 10 : -1;
      return height > 0 ? `${meter}m` : 'Unknown';
    }
    return 'Unknown';
  });

  readonly isFavorite = computed(() => {
    //TODO: to be implement
    return false;
  })

  toggleFavorite(): void {
    const details = this.pokemonDetails();
    if (!details) {
      return;
    }
    //TODO: to be implement
  }
}
