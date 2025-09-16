import { Component, signal } from '@angular/core';
import { CharacterListComponent } from '../../components/evangelion/character-list/character-list.component';

interface Character {
  id: number
  name: string;
  age: number;
}

@Component({
  templateUrl: './evangelion-rebuild.component.html',
  selector: 'app-evangelion-rebuild',
  imports: [CharacterListComponent],
})
export class EvangelionRebuildComponent {

  name = signal('');
  age = signal(0);

  characters = signal<Character[]>([
    { id: 1, name: 'Shinji', age: 14 },
    { id: 2, name: 'Rei', age: 15 },
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
