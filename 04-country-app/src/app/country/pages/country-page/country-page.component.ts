import {  Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs/internal/observable/of';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-page',
  imports: [],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

  //Obtener el valor del parametro en la ruta en la que estamos (snapshot)
  countryCode = inject(ActivatedRoute).snapshot.params['code'];

  countryService = inject(CountryService);

  countryResource = rxResource({
    request: () => ({ code: this.countryCode }),

    loader: ({request}) => {
      return this.countryService.searchCountryByAlphaCode( request.code);
    }
  });

}
