import { Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

@Injectable({providedIn: 'root'})
export class EvangelionService {

  /* Tener la informacion en el servicio, permite que se mantenga aun cuando el componente que la usa se destruya
     es decir, podre cambiar de pagina y volver y la informacion seguira ahi */

  characters = signal<Character[]>([
    { id: 1, name: 'Shinji', age: 14 },
    { id: 2, name: 'Rei', age: 15 },
  ]);

  addCharacter(character: Character):void {
    this.characters.update(
      list => [...list, character]
    )
  }

}
