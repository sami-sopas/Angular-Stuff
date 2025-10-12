import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GifService {
  //Aqui se inyecta ese HttpCliente
  private http = inject(HttpClient);

  trendingGifs = signal(<Gif[]>[]);
  trendingGifsLoading = signal(true);

  constructor() {
    this.loadTrendingGifs();
    console.log('Servicio creado');
  }

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${ environment.giphyUrl}/gifs/trending`,{
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
      }
    }).subscribe( (resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifsLoading.set(false);
      this.trendingGifs.set(gifs);
      console.log(gifs);
    })
  }

  searchGifs(query: string) {
    return this.http.get<GiphyResponse>(`${ environment.giphyUrl}/gifs/search`,{
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query
      }
    }).pipe(
      /* Cuando se emita el observable, el map barrer cada elemento
         para modificar la data para hacer un mappeo por ejemplo
      */
      map( ({data}) => data), //({data}) es como decir resp.data
      map( (items) => GifMapper.mapGiphyItemsToGifArray(items))

      //TODO: Historeial
    );
  }

}
