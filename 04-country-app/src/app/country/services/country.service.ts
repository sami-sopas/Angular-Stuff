import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError, delay, count, of, tap } from 'rxjs';
import { Region } from '../types/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})

export class CountryService {

  private http = inject(HttpClient);

  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();

  searchByCapital( query: string) : Observable<Country[]> {
    query = query.toLowerCase();

    //Save results in map to act like a "cache"
    if( this.queryCacheCapital.has( query )) {
      return of( this.queryCacheCapital.get( query ) ?? [] );
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${ query }`)
      .pipe(
        map( (restCountries) =>
          CountryMapper.mapRestCountriesToCountryArray(restCountries)
        ),
        tap( countries => this.queryCacheCapital.set(query, countries)), //Save response in cache
        catchError( error => {
          console.log('Error en el servicio', error);

          return throwError(
            () => new Error('No se pudo obtener paises con esa query: ' + query));
        })
      );
  }

  searchByCountry( query: string) : Observable<Country[]> {
    query = query.toLowerCase();

    if( this.queryCacheCountry.has( query )) {
      return of( this.queryCacheCountry.get( query ) ?? [] );
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${ query }`)
      .pipe(
        map( (restCountries) =>
          CountryMapper.mapRestCountriesToCountryArray(restCountries)
        ),
        tap(countries => this.queryCacheCountry.set(query, countries)),
        delay(2000),
        catchError( error => {
          console.log('Error en el servicio', error);

          return throwError(
            () => new Error('No se pudo obtener paises con esa query: ' + query));
        })
      );
  }

  searchCountryByAlphaCode( code: string ) : Observable<Country | undefined> {

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${ code }`)
      .pipe(
        map( (restCountries) =>
          CountryMapper.mapRestCountriesToCountryArray(restCountries)
        ),
        map( countries => countries.at(0) ),
        catchError( error => {
          console.log('Error en el servicio', error);

          return throwError(
            () => new Error('No se pudo obtener paises con esa alpha code: ' + code));
        })
      );
  }

  searchByRegion( region: Region ) : Observable<Country[]> {

    //Save results in map to act like a "cache"
    if( this.queryCacheRegion.has( region )) {
      return of( this.queryCacheRegion.get( region ) ?? [] );
    }


    return this.http.get<RESTCountry[]>(`${API_URL}/region/${ region }`)
      .pipe(
        map( (restCountries) =>
          CountryMapper.mapRestCountriesToCountryArray(restCountries)
        ),
        tap( countries => this.queryCacheRegion.set(region, countries)), //Save response in cache
        catchError( error => {
          console.log('Error en el servicio', error);

          return throwError(
            () => new Error('No se pudo obtener paises con esa query: ' + region));
        })
      );
  }

}
