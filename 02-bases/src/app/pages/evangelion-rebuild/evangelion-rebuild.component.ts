import { Component, signal } from '@angular/core';
import { CharacterListComponent } from '../../components/evangelion/character-list/character-list.component';
import { CharacterAddComponent } from "../../components/evangelion/character-add/character-add.component";

interface Character {
  id: number
  name: string;
  age: number;
}

@Component({
  templateUrl: './evangelion-rebuild.component.html',
  selector: 'app-evangelion-rebuild',
  imports: [CharacterListComponent, CharacterAddComponent],
})
export class EvangelionRebuildComponent {

  name = signal('');
  age = signal(0);

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
