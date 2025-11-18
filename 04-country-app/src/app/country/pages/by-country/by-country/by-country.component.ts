import { Component } from '@angular/core';
import { ListComponent } from '../../../components/list/list.component';
import { SearchInputComponent } from '../../../components/search-input/search-input.component';

@Component({
  selector: 'app-by-country',
  imports: [ListComponent,SearchInputComponent],
  templateUrl: './by-country.component.html',
})
export class ByCountryComponent { }
