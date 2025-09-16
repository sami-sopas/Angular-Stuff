import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'evangelion-character-add',
  templateUrl: './character-add.component.html',
})
export class CharacterAddComponent {
  name = signal('');

  age = signal(0);

  //output indica que nuestro componente va emitir un evento
  newCharacter = output<Character>();

  characters = signal<Character[]>([
    { id: 1, name: 'Shinji', age: 14 },
    { id: 2, name: 'Rei', age: 15 },
  ]);

  addCharacter() {
    if(!this.name() || this.age() <= 0){
      return;
    }

    const newCharacter: Character = {
      id: Math.floor(Math.random() * 1000),
      name: this.name(),
      age: this.age()
    }

    this.newCharacter.emit(newCharacter);

    this.resetFields();
  }

  resetFields(): void {
    this.name.set('');
    this.age.set(0);
  }
}
