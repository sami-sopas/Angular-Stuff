export class Person {
  // public name: string;
  // private address: string;

  constructor(
    public firstName: string,
    public lastName: string,
    private address: string = 'No Address'
  ) {}
}

/*
export class Hero extends Person {
  constructor(
    public alterEgo: string,
    public age: number,
    public realName: string
  ) {
    super(realName, 'New York'); //Super indica que llamara al constructor de la clase padre (Person)
  }
}
*/

//Priorizando composicion sobre herencia
export class Hero {
  //public person: Person;

  constructor(
    public alterEgo: string,
    public age: number,
    public realName: string,
    public person: Person
  ) {
    //this.person = new Person(realName);
  }
}

const juan = new Person('Juanelo', 'Perez', 'Porton Blanco');
const ironMan = new Hero('IronMan', 45, 'Juan', juan);

console.log(ironMan);
