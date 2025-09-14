import { Component } from "@angular/core";

@Component({
  template: `
    <h1>Counter: {{ counter }}</h1>
    <button (click)="increaseByOne(1)">+1</button>
  `,
})
export class CounterComponent {
  counter = 15;

  increaseByOne(value: number) {
    this.counter += value;
  }
}
