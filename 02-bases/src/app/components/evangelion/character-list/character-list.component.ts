import { Component, input } from '@angular/core';
import type { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'evangelion-character-list',
  templateUrl: './character-list.component.html',
})
export class CharacterListComponent {
  //Input signal, para pasar valores desde componente padre a componente hijo mediante [characters]="characters()
characters = input.required<Character[]>();
}
