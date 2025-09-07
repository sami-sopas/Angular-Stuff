//Un decorador no es mas que una funcion que añade cierto comportamiento a una clase
function classDecorator<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    newProperty = 'New Property';
    hello = 'override';
  };
}

@classDecorator
export class SuperClass {
  public myProperty: string = 'Abc123';

  print() {
    console.log('Hola mundo');
  }
}

console.log(SuperClass); //Definicion de clase

const myClass = new SuperClass();

console.log(myClass); //Instancia de clase
