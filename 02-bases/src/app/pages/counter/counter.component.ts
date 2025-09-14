import { ChangeDetectionStrategy, Component, signal } from "@angular/core";

@Component({
  templateUrl: './counter.component.html',
  styles: `
  button {
    padding: 5px;
    margin: 5px 10px;
    width: 75px:
  }`,
  //changeDetection: ChangeDetectionStrategy.OnPush //(Indica que no usare ZoneJs)
})
export class CounterComponent {
  counter = 15;
  counterSignal = signal(10);

  constructor(){
    setInterval(() => {
      //this.counter += 1;
      this.increaseByOne(1);
      console.log('Tick');
    },2000);
  }

  increaseByOne(value: number) {
    this.counter += value;
    this.counterSignal.update( (currentValue) => currentValue + value);
  }

  resetCounter(){
    this.counter = 0;
    this,this.counterSignal.set(0);
  }
}
