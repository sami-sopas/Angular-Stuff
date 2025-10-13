import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import { ListComponent } from "../../components/list/list.component";

@Component({
  selector: 'app-gif-history',
  imports: [ListComponent],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent {

  gifsService = inject(GifService);

  //query que regresa la url al acceder a la ruta
  //se convierte el observable a una signal y se hace un pipe para obtener el query
  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map( params => params['query'] ?? '')
    )
  );

  //Recordar que esta propiedad computada se va a volver a calcular cada vez que la señal query cambie
  gifsByKey = computed( () => {
    return this.gifsService.getHistoryGifs(this.query());
  })

}
