import { Component } from '@angular/core';

//Esto se puede gracias al tsconfig y los paths configurados
import { environment } from '@environments/environment';

@Component({
  selector: 'gifs-side-menu-header',
  imports: [],
  templateUrl: './side-menu-header.component.html',
})
export class SideMenuHeaderComponent {
  envs = environment
}
