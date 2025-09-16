import { Component, inject } from '@angular/core';
import { CharacterListComponent } from '../../components/evangelion/character-list/character-list.component';
import { CharacterAddComponent } from "../../components/evangelion/character-add/character-add.component";
import { EvangelionService } from '../../services/evangelion.service';

@Component({
  templateUrl: './evangelion-rebuild.component.html',
  selector: 'app-evangelion-rebuild',
  imports: [CharacterListComponent, CharacterAddComponent],
})
export class EvangelionRebuildComponent {

  // Inyeccion de dependencias anterior
  // constructor(
  //   public evangelionService: EvangelionService
  // ) {}

  //Inyeccion de dependencias nueva
  public evangelionService = inject(EvangelionService);

}
