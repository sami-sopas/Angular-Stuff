const skills: string[] = ['Bash', 'Counter', 'Healing'];

//La interfaz permite asignale un tipo de dato a un campo de un objeto
interface Character {
  name: string;
  hp: number;
  skills: string[];
  hometown?: string; //Opcional: string | undefined
}

const strider: Character = {
  name: 'Strider',
  hp: 100,
  skills: ['Bash', 'Counter'],
};

strider.hometown = 'Rivendell';

console.table(strider);

export {};
