const numeros = [1, 2, 3, 4, 5, 6];

// sin map _ resultado > { outputSinMap: [ 2, 4, 6, 8, 10, 12 ] }
const output = [];

for (let i = 0; i < numeros.length; i++) {
  output[i] = numeros[i] * 2;
}

console.log({ outputSinMap: output });

// con map : resultado > { outputConMap: [ 2, 4, 6, 8, 10, 12 ] }

console.log({ outputConMap: numeros.map((numero) => numero * 2) });
