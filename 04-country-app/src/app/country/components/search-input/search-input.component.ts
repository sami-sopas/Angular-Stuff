import {  Component, EventEmitter, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

  placeholderText = input<string>('Search');
  searchValue = output<string>();
 }
