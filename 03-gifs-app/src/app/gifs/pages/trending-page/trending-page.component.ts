import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending-page',
  //imports: [ListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {

  //Services
  gifsService = inject(GifService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if(!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop; //Posicion actual del scroll
    const clientHeight = scrollDiv.clientHeight; //Altura visible del contenedor (cliente POV)
    const scrollHeight = scrollDiv.scrollHeight //Maximo posible del scroll

    //Determinar si el scroll esta por llegar al final
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;

    if(isAtBottom){
     this.gifsService.loadTrendingGifs();
    }

  }
 }
