import PromptSync from "prompt-sync";

import {
    createProduct,
    getProducts,
    calcularSubtotal,
    calcularIVA,
    calcularTotal
} from "./service/CalculoService.js";

const prompt = PromptSync();

const readNumber = (message: string): number => {
    return Number(prompt(message).trim());
}

const showMenu = (): void => {
    console.log("\n===== MENU =====");
    console.log("1. Agregar producto");
    console.log("2. Mostrar productos");
    console.log("3. Calcular factura");
    console.log("0. Salir");
}

const create = (): void => {
    const nombre = prompt("Nombre del producto: ");
    const precio = readNumber("Precio del producto: ");

    if (!nombre || precio <= 0) {
        console.log("Datos inválidos.");
        return;
    }

    const product = createProduct(nombre, precio);
    console.log("\nProducto agregado correctamente.");
    console.table(product);
}

const list = (): void => {
    const productList = getProducts();

    if (productList.length === 0) {
        console.log("No hay productos.");
        return;
    }
    console.table(productList);
}

const factura = (): void => {
    const productList = getProducts();

    if (productList.length === 0) {
        console.log("No existen productos registrados.");
        return;
    }

    console.log("\n===== PRODUCTOS =====");
    console.table(productList);

    const subtotal = calcularSubtotal();
    const iva = calcularIVA(subtotal);
    const total = calcularTotal(subtotal, iva);

    console.log("----------------------------");
    console.log(`precio : Q${subtotal.toFixed(2)}`);
    console.log(`precio conIVA (12%): Q${iva.toFixed(2)}`);
    console.log(`total    : Q${total.toFixed(2)}`);
}

let option = 1;

while (option != 0) {
    showMenu();
    option = readNumber("Seleccione una opción: ");

    switch (option) {
        case 1:
            create();
            break;
        case 2:
            list();
            break;
        case 3:
            factura();
            break;
        case 0:
            console.log("saliste del programa");
            break;
        default:
            console.log("Opción no permitida");
    }
}