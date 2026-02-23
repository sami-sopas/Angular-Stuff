import {  Component, effect, EventEmitter, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

  placeholderText = input<string>('Search');
  searchValue = output<string>();

  debounceTime = input<number>(1000);
  initialValue = input<string>('');
  inputValue = linkedSignal<string>(() => this.initialValue() ?? ''); //linkedSignal permite inicializar una signal con algun proceso

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
