import {Component, effect, inject, input} from '@angular/core';
import {pokeCollectorStore} from "../../app.store";
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
    PokemonCardComponent
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
  private readonly store = inject(pokeCollectorStore);

  id = input.required<number>();
  readonly loading = this.store.loading;
  readonly pokemon = this.store.pokemonCollectionEntities;
  readonly favorites = this.store.favoritesEntities;
  readonly selectedPokemonId = this.store.selectedPokemonId;

  loadPokemon = effect(() => {
    this.store.loadPokeCollection(this.id());
  }, {allowSignalWrites: true});

  async openPokemon(pokemonId: number): Promise<void> {
    this.store.selectPokemon(pokemonId);
    await this.router.navigate(['pokemon', pokemonId], {relativeTo: this.activatedRoute});
  }
}
