export interface Passenger {
  name: string;
  children?: string[];
}

const passenger1: Passenger = {
  name: 'Juanito',
};

const passenger2: Passenger = {
  name: 'Juanito casado',
  children: ['Fulano', 'Perengano'],
};

const printChildren = (passenger: Passenger) => {
  //const howManyChildren = passenger.children?.length || 0;

  console.log(passenger.name, howManyChildren);
};

printChildren(passenger1);

//? Opcional chaining. (children?.length)
//! Siempre vendra ese campo. (children!.length)
