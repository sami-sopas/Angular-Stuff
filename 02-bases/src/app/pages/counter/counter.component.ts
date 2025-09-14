import { Component } from "@angular/core";

@Component({
  templateUrl: './counter.component.html',
  styles: `
  button {
    padding: 5px;
    margin: 5px 10px;
    width: 75px:
  }`
})
export class CounterComponent {
  counter = 15;

  increaseByOne(value: number) {
    console.log(value)
    if(value > 0){
      this.counter += value;
    }
    else{
      this.counter -= Math.abs(value);
    }
  }

  resetCounter(){
    this.counter = 0;
  }
}
