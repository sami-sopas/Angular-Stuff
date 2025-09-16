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

  name = signal('Ikari');
  age = signal(20);

  characters = signal<Character[]>([
    { id: 1, name: 'Shinji', age: 14 },
    { id: 2, name: 'Rei', age: 15 },
    { id: 3, name: 'Asuka', age: 16 },
    { id: 4, name: 'Kaworu', age: 14 },
    { id: 5, name: 'Toji', age: 12 },
  ]);

  addCharacter():void {
    if(!this.name() || this.age() <= 0){
      return;
    }

    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      age: this.age()
    }

    //this.characters().push(newCharacter); <- Esta opcion funciona, pero no es la mas recomendada

    this.characters.update(
      (list) => [...list, newCharacter]
    );

    this.resetFields();
  }

  resetFields(): void {
    this.name.set('');
    this.age.set(0);
  }

  // ageClassess = computed( () => {
  //   return {
  //     'text-danger': true
  //   }
  // })

}
