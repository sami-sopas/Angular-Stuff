import { Component, inject, resource, signal } from '@angular/core';
import { CountryListComponent } from '../../../components/list/country-list.component';
import { SearchInputComponent } from '../../../components/search-input/search-input.component';
import { firstValueFrom } from 'rxjs';
import { CountryService } from '../../../services/country.service';

@Component({
  selector: 'app-by-country',
  imports: [CountryListComponent,SearchInputComponent],
  templateUrl: './by-country.component.html',
})
export class ByCountryComponent {

  countryService = inject(CountryService);

  query = signal('');

  countryResource = resource({
    request: () => ({ query: this.query()}),

    loader: async({ request }) => { //este request, es basicamente, el objeto que tenemos arriba en request
      if( !request.query ) return [];

      return await firstValueFrom(
        this.countryService.searchByCountry( request.query ) //FirstValueFrom, convierte un Observable en una Promesa
      );

    }
  })
 }
