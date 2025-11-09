import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
//import { ListComponent } from "../../components/list/list.component";
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-sate.service';

@Component({
  selector: 'app-trending-page',
  //imports: [ListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {

  //Services
  gifsService = inject(GifService);

  scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  //Metodo que se ejecuta cuando ya se inicializo la vista
  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();

  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop; //Posicion actual del scroll
    const clientHeight = scrollDiv.clientHeight; //Altura visible del contenedor (cliente POV)
    const scrollHeight = scrollDiv.scrollHeight //Maximo posible del scroll

    //Determinar si el scroll esta por llegar al final
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;

    this.scrollStateService.trendingScrollState.set(scrollTop);

    if(isAtBottom){
     this.gifsService.loadTrendingGifs();
    }

  }
 }
