import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/generations/generations.component').then(c => c.GenerationsComponent)
  },
  {
    path: 'generation',
    children: [
      {
        path: ':id',
        loadComponent: () => import('./pages/pokemon/pokemon.component').then(c => c.PokemonComponent)
      },
      {
        path: ':id/pokemon/:pokemonId',
        loadComponent: () => import('./pages/pokemon-detail/pokemon-detail.component').then(c => c.PokemonDetailComponent)
      }
    ]
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.component').then(c => c.FavoritesComponent)
  }
];
