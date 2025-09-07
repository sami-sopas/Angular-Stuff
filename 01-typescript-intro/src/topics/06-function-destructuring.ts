interface Product {
  description: string;
  price: number;
}

const phone: Product = {
  description: 'Samsung A1',
  price: 150.0,
};

const tablet: Product = {
  description: 'iPad',
  price: 250.0,
};

interface TaxCalculationOptions {
  tax: number;
  products: Product[];
}

function taxCalculation(options: TaxCalculationOptions): [number, number] {
  const { tax, products } = options;

  let total = 0;

  products.forEach(({ price }) => {
    //Se desestructura del producto solamente el precio
    total += price;
  });

  return [total, total * tax];
}

const shoppingCart: Product[] = [phone, tablet];
const tax = 0.15;

const result = taxCalculation({
  products: shoppingCart,
  tax: tax,
});

const [total, totalTax] = result;

console.log('Total', total);
console.log('Tax', totalTax);

export {};
