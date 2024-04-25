import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitleGroup} from "@angular/material/card";
import {ApiService} from "../../services/api.service";
import {AsyncPipe} from "@angular/common";
import {map} from "rxjs";

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
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);

  readonly generations$ = this.apiService.generations().pipe(
    map(({data}) => data.items)
  );

  async openPokemonCollection(generationId: number): Promise<void> {
    await this.router.navigate(['/generation', generationId]);
  }
}
