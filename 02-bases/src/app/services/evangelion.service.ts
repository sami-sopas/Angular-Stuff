import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

function loadFromLocalStorage(): Character[] {
  const characters = localStorage.getItem('characters');

  return characters ? JSON.parse(characters) : [];
}

@Injectable({providedIn: 'root'})
export class EvangelionService {

  /* Tener la informacion en el servicio, permite que se mantenga aun cuando el componente que la usa se destruya
     es decir, podre cambiar de pagina y volver y la informacion seguira ahi */

  characters = signal<Character[]>(loadFromLocalStorage());

  //Cada que la señal cambie, se ejecutara este metodo, en este caso cuando this.characters() cambie
  saveToLocalStorage = effect( () => {
    console.log(`Character count ${this.characters().length}`);

    localStorage.setItem('characters', JSON.stringify(this.characters()) ); //JSON.stringify convierte un objeto a string
  })

  addCharacter(character: Character):void {
    this.characters.update(
      list => [...list, character]
    )
  }

}
