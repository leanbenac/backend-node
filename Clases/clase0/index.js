// tipos primitivos 

const a = 1;
const b = "texto"

let a_copia = a //number
let b_copia = b; // string 

// copia por valor NO modifica el valor 
a_copia = 2;
b_copia = "hola";

// console.log('a_copia:', a_copia);
// console.log('a:', a);

console.log('b_copia:', b_copia);
console.log('b:', b);

// tipos objeto // valor por referencia MODIFIFCA en valor del objeto 

let c = { nombre: "pepe"} // object
let d = [1, 2 ,3]

let c_copia = c;
let d_copia = d;

c_copia.nombre = "juan";
d_copia.push(4)

console.log('c_copia:', c_copia);
console.log('c:', c);

console.log('d_copia:', d_copia);
console.log('d:', d);