import {
  Product,
  taxCalculation,
  TaxCalculationOptions,
} from './06-function-destructuring';

const shoppingCart: Product[] = [
  {
    description: 'Nokia',
    price: 100,
  },
  {
    description: 'iPad',
    price: 150,
  },
];

const taxCalculationOptions: TaxCalculationOptions = {
  tax: 0.15,
  products: shoppingCart,
};

//Tax = 0.15
const [total, tax] = taxCalculation(taxCalculationOptions);

console.log('Total', total);
console.log('Tax', tax);
export {};
