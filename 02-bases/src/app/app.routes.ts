import { Routes } from '@angular/router';
import { CounterComponent } from './pages/counter/counter.component';
import { HeroPageComponent } from './pages/hero/hero-page.component';
import { EvangelionComponent } from './pages/evangelion/evangelion.component';

export const routes: Routes = [
  {
    path: 'counter',
    component: CounterComponent
  },
  {
    path: 'hero',
    component: HeroPageComponent
  },
  {
    path: 'evangelion',
    component: EvangelionComponent
  },
  {
    path: '**', //Cualquier path no definido
    redirectTo: ''
  }
];
