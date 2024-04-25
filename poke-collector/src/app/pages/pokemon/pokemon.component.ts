import {Component, inject, input, signal} from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from "@angular/material/card";
import {query, transition, trigger} from "@angular/animations";
import {slideFadeAnimationFactory} from "../../animations/slide.animations";
import {ActivatedRoute, Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {PokemonCardComponent} from "../../components/pokemon-card/pokemon-card.component";
import {toObservable} from "@angular/core/rxjs-interop";
import {map, switchMap, tap} from "rxjs";
import {ApiService} from "../../services/api.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardTitleGroup,
    MatCardContent,
    MatIcon,
    MatIconButton,
    PokemonCardComponent,
    AsyncPipe
  ],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss',
  animations: [
    trigger('pokemonCollection', [transition(':enter', [query(':enter', slideFadeAnimationFactory())])]),
  ],
})
export class PokemonComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);

  id = input.required<number>();

  private readonly id$ = toObservable(this.id);
  readonly loading = signal(false);
  readonly selectedPokemonId = signal<number>(-1);
  readonly pokemon$ = this.id$.pipe(
    tap(() => this.loading.set(true)),
    switchMap(id => {
      console.log('Try to call pokemon collection with id:', id);
      this.selectedPokemonId.set(id);
      return this.apiService.loadPokemonCollection(id);
    }),
    map(({data}) => data.items),
    tap(() => {
      this.loading.set(false);
    })
  );


  async openPokemon(pokemonId: number): Promise<void> {
    this.selectedPokemonId.set(pokemonId);
    await this.router.navigate(['pokemon', pokemonId], {relativeTo: this.activatedRoute});
  }
}
