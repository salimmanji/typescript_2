import { isNotEmpty, isNumber, isPositive } from 'class-validator';

export class Product {
    @isNotEmpty()
    title: string;
    @isNumber()
    @isPositive()
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }

    getInfo() {
        return [this.title, `$${this.price}`];
    }
}