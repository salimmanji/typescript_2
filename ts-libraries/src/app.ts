import _ from 'lodash';
import { Product } from './product.model';

// Class Transformer
import "reflect-metadata";
import {plainToInstance} from 'class-transformer';
import { validate } from 'class-validator';

declare var GLOBAL: any; // or string...

console.log(_.shuffle([1,2,3]));
console.log(_.chunk([1,2,3,4,5,6,7,8,9], 2));

const p1 = new Product('A book', 12.99)
console.log(p1.getInfo());


const products = [
    {title: 'A carpet', price: 29.99},
    {title: 'B book', price: 10.99}
];


// Manuall product creation
const builtProducts = products.map(prod => {
    return new Product(prod.title, prod.price);
}); 

for (const prod of builtProducts) {
    console.log(prod.getInfo());
}


// plainToInstance class transformer
const altProducts = plainToInstance(Product, products);
for (const prod of altProducts) {
    console.log(prod.getInfo());
}


// Class Validator