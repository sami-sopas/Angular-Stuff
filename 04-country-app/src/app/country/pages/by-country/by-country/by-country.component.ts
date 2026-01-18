import { Component, inject, resource, signal } from '@angular/core';
import { CountryListComponent } from '../../../components/list/country-list.component';
import { SearchInputComponent } from '../../../components/search-input/search-input.component';
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country',
  imports: [CountryListComponent,SearchInputComponent],
  templateUrl: './by-country.component.html',
})
export class ByCountryComponent {

  countryService = inject(CountryService);

  query = signal('');

  countryResource = rxResource({
    request: () => ({ query: this.query()}),

    loader:({ request }) => {
      if ( !request.query) return of([]); //of, crea un Observable a partir de un valor

      return this.countryService.searchByCountry( request.query ) //FirstValueFrom, convierte un Observable en una Promesa
    }
  })

 }
