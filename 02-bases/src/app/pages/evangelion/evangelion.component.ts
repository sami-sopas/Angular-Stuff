import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

interface Character {
  id: number
  name: string;
  age: number;
}

@Component({
  templateUrl: './evangelion.component.html',
  imports: [],
})
export class EvangelionComponent {

  characters = signal<Character[]>([
    { id: 1, name: 'Shinji', age: 14 },
    { id: 2, name: 'Rei', age: 15 },
    { id: 3, name: 'Asuka', age: 16 },
    { id: 4, name: 'Kaworu', age: 14 },
    { id: 5, name: 'Toji', age: 12 },
  ]);

  // ageClassess = computed( () => {
  //   return {
  //     'text-danger': true
  //   }
  // })

}
