//normal function
function addNumbers(a: number, b: number): number {
  return a + b;
}

//arrow function
const addNumbersArrow = (a: number, b: number): string => {
  return `${a + b}`; //Inyeccion de expresion de JS en un template
};

//Opcional && default parameters
function multiply(
  firstNumber: number,
  secondNumber?: number,
  base: number = 2
) {
  return firstNumber * base;
}

/*
const result: number = addNumbers(1, 2);
const result2: string = addNumbersArrow(1, 2);
const multiplyResult: number = multiply(5);

console.log({ result, result2, multiplyResult });
*/

//Pasar parametros como objeto a una funcion
interface Character {
  name: string;
  hp: number;
  showHp: () => void;
}

const healCharacter = (character: Character, amount: number) => {
  character.hp += amount;
};

const strider = {
  name: 'Strider',
  hp: 50,
  showHp() {
    console.log(`Puntos de vida: ${this.hp}`);
  },
};

healCharacter(strider, 50);

strider.showHp();
export {};
