//TRIM
const texto = "   Hola, soy un texto con espacios en blanco.   ";
const textoSinEspacios = texto.trim();
console.log(textoSinEspacios); // "Hola, soy un texto con espacios en blanco."



//FLAT
const arregloAnidado = [1, [2, 3], [4, [5, 6]]];
const arregloPlano = arregloAnidado.flat();
console.log(arregloPlano); // [1, 2, 3, 4, 5, 6]
