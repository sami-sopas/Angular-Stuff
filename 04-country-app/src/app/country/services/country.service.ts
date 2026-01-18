import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError, delay } from 'rxjs';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})

export class CountryService {

  private http = inject(HttpClient);

  searchByCapital( query: string) : Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${ query }`)
      .pipe(
        map( (restCountries) =>
          CountryMapper.mapRestCountriesToCountryArray(restCountries)
        ),
        catchError( error => {
          console.log('Error en el servicio', error);

          return throwError(
            () => new Error('No se pudo obtener paises con esa query: ' + query));
        })
      );
  }

  searchByCountry( query: string) : Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${ query }`)
      .pipe(
        map( (restCountries) =>
          CountryMapper.mapRestCountriesToCountryArray(restCountries)
        ),
        delay(2000),
        catchError( error => {
          console.log('Error en el servicio', error);

          return throwError(
            () => new Error('No se pudo obtener paises con esa query: ' + query));
        })
      );
  }


}
