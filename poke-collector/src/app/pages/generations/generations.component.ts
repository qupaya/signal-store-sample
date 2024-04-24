import {Component, inject} from '@angular/core';
import {pokeCollectorStore} from "../../app.store";
import {Router} from "@angular/router";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitleGroup} from "@angular/material/card";

@Component({
  selector: 'app-generations',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitleGroup,
    MatCardContent
  ],
  templateUrl: './generations.component.html',
  styleUrl: './generations.component.scss'
})
export class GenerationsComponent {
  private readonly store = inject(pokeCollectorStore);
  private readonly router = inject(Router);

  readonly loading = this.store.loading;
  readonly generations = this.store.generationsEntities;

  async openPokemonCollection(generationId: number): Promise<void> {
    await this.router.navigate(['/generation', generationId]);
  }
}
