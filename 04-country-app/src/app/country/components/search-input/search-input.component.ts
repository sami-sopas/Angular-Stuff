import {  Component, effect, EventEmitter, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

  placeholderText = input<string>('Search');
  searchValue = output<string>();
  inputValue = signal<string>('');

  debounceTime = input<number>(500);

  //Todos los cambios en la signal inputValue, se relantizaran por el efecto
  //Sirve para que mientras no termina de escribir el usuario,
  // no se emitira el valor de la busqueda (para no enviar muchas querys a la ves)
  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue(); //Cuando cambie la signal, se ejecutara el efecto aqui
    const timeout = setTimeout(() => {
      this.searchValue.emit(value);
    }, this.debounceTime());

    //funcion que se ejecuta al destruir el componente
    onCleanup(() => {
      clearTimeout(timeout);
    })

  })
 }
