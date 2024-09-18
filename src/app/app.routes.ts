import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'jogo', 
    loadComponent: () => import('./jogo/jogo.component').then(m => m.JogoComponent) 
  },
  { 
    path: 'ranking', 
    loadComponent: () => import('./ranking/ranking.component').then(m => m.RankingComponent) 
  },
  { 
    path: '', redirectTo: '/jogo', pathMatch: 'full' 
  }
];
