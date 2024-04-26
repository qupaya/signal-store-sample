import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitleGroup} from "@angular/material/card";
import {AsyncPipe} from "@angular/common";
import {pokemonCollectorStore} from "../../app.store";

@Component({
  selector: 'app-generations',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitleGroup,
    MatCardContent,
    AsyncPipe
  ],
  templateUrl: './generations.component.html',
  styleUrl: './generations.component.scss'
})
export class GenerationsComponent {
  private readonly store = inject(pokemonCollectorStore);
  private readonly router = inject(Router);

  readonly generations = this.store.generations;
  readonly loading = this.store.loading;

  async openPokemonCollection(generationId: number): Promise<void> {
    await this.router.navigate(['/generation', generationId]);
  }
}
