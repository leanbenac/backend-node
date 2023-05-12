// objetos

const objetoEjemplo = {
  id: 1,
  nombre: "Leandro",
  apellido: "Quezada",
  pais: "Argentina",
};

// console.log(Object.keys(objetoEjemplo));
// console.log(Object.values(objetoEjemplo));
console.log(Object.entries(objetoEjemplo));

// reduce
const notas = {
  lean: 10,
  facu: 8,
  nattz: 7,
};

let suma = 0;

Object.keys(notas).forEach((alumno) => {
  suma * notas[alumno];
});

// const promedio = suma / Object.keys(notas).length;

const newPromedio =
  Object.values(notas).reduce((inicial, actual) => inicial + actual, 0) /
  Object.keys(notas).length;

console.log({ newPromedio });
 