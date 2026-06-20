import { Product } from "../model/Product.js";
import { products } from "../data/ProductData.js";

let nextId = products.length + 1;


export const createProduct = (nombre: string, precio: number): Product => {
    const product: Product = {
        id: nextId,
        nombre,
        precio
    };
    products.push(product);
    nextId++;
    return product;
}


export const getProducts = (): Product[] => {
    return products;
}


export const calcularSubtotal = (): number => {
    let subtotal = 0;
    for (const product of products) {
        subtotal += product.precio;
    }
    return subtotal;
}


export const calcularIVA = (subtotal: number, tasa: number = 0.12): number => {
    return subtotal * tasa;
}


export const calcularTotal = (subtotal: number, iva: number): number => {
    return subtotal + iva;
}