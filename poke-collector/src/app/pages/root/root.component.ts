import {Component, inject, signal} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {Location} from '@angular/common';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatCard, MatCardContent, MatCardTitle, MatIconButton, MatIcon],
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss'
})
export class RootComponent {
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  readonly showFavorites = signal(false);

  async toggleFavorites(): Promise<void> {
    this.showFavorites.set(!this.showFavorites());
    if (this.showFavorites()) {
      await this.router.navigate(['favorites']);
    } else {
      this.location.back();
    }
  }
}
