import {  Component, inject, signal } from '@angular/core';
import { CountryListComponent } from '../../../components/list/country-list.component';
import { CountryService } from '../../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { Region } from '../../../types/region.type';

@Component({
  selector: 'app-by-region',
  imports: [CountryListComponent],
  templateUrl: './by-region.component.html',
})
export class ByRegionComponent {

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countryService = inject(CountryService);
  selectedRegion = signal<Region | null>(null);

  //Codigo que usa rxResource (el que usa observables) ---------------------------
  countryResource = rxResource({
    request: () => ({ region: this.selectedRegion()}),

    loader:({ request }) => {
      if ( !request.region) return of([]); //of, crea un Observable a partir de un valor

      return this.countryService.searchByRegion( request.region ) //FirstValueFrom, convierte un Observable en una Promesa
    }
  })

 }
