import { Component } from '@angular/core';
import { CountryListComponent } from '../../../components/list/country-list.component';
import { SearchInputComponent } from '../../../components/search-input/search-input.component';

@Component({
  selector: 'app-by-country',
  imports: [CountryListComponent,SearchInputComponent],
  templateUrl: './by-country.component.html',
})
export class ByCountryComponent { }
