import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from "../../components/list/country-list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, Observable, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);

  query = signal('');

  //Codigo que usa rxResource (el que usa observables) ---------------------------
  countryResource = rxResource({
    request: () => ({ query: this.query()}),

    loader:({ request }) => {
      if ( !request.query) return of([]); //of, crea un Observable a partir de un valor

      return this.countryService.searchByCapital( request.query ) //FirstValueFrom, convierte un Observable en una Promesa
    }
  })

  //Codigo que usa reource (el que usa promesas) ---------------------------
  // countryResource = resource({
  //   request: () => ({ query: this.query()}),

  //   loader: async({ request }) => { //este request, es basicamente, el objeto que tenemos arriba en request
  //     if( !request.query ) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCapital( request.query ) //FirstValueFrom, convierte un Observable en una Promesa
  //     );

  //   }
  // })

  //Codigo que se remplazo al usar resource---------------------------
  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([])


  // onSearch(query: string) {
  //   if(this.isLoading()) return; // Prevent multiple requests

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query)
  //     .subscribe({
  //       next: ( countries ) => {
  //         this.isLoading.set(false);
  //         this.countries.set(countries);
  //       },
  //       error: ( err) => {
  //         this.isLoading.set(false);
  //         this.countries.set([]);
  //         this.isError.set(err);
  //       }
  //     })
  // }

}
