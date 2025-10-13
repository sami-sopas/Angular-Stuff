import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, effect } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

function loadFromLocalStorage() {
  const gifsFromLocalStorage = localStorage.getItem('gifs') ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);
  console.log(gifs);
  return gifs;
}

@Injectable({providedIn: 'root'})
export class GifService {
  //Aqui se inyecta ese HttpCliente
  private http = inject(HttpClient);

  trendingGifs = signal(<Gif[]>[]);
  trendingGifsLoading = signal(true);

  //Para recuperar busquedas anteriores
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory())); //Cada vez que la señal searchHistory cambie, esta computed se va a volver a calcular

  constructor() {
    this.loadTrendingGifs();
  }

  //Este efecto se ejecutara cada que searchHistory cambie
  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs', historyString);
  });

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
      console.log({gifs});
    })
  }

  searchGifs(query: string) : Observable<Gif[]> {
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
      map( (items) => GifMapper.mapGiphyItemsToGifArray(items)),

      //Historia;: se guarda lo que ya se busco, y se le agrega lo nuevo que encontro
      tap( (items) => {
        this.searchHistory.update ( (currentItems) => ({
          ...currentItems,
          [query.toLowerCase()]: items
        }));
      }
    ));
  }

  //Esta funcion lee la llave(query) y devuelve los gifs que hay en esa llave
  //si no encuentra nada, devuelve un array vacio
  getHistoryGifs(query: string) : Gif[] {
    return this.searchHistory()[query] ?? [];
  }

}
