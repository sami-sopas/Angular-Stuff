import { Component, computed, signal } from "@angular/core";
import { UpperCasePipe } from "@angular/common";

@Component({
  templateUrl: './hero-page.component.html',
  imports: [UpperCasePipe]
})
export class HeroPageComponent {

  name = signal<string>('Ironman');
  age = signal<number>(45);

  //Computed signal
  heroDescription = computed(() => {
    const description = `${ this.name() } - ${ this.age() }`;
    return description;
  });

  capitalizedName = computed( () => {
    return this.name().toUpperCase();
  })

  changeHero(): void {
    this.name.set('Spiderman');
    this.age.set(22);
  }

  resetForm(): void {
    this.name.set('Ironman');
    this.age.set(45);
  }

  changeAge(): void {
    this.age.set(60);
  }
}
