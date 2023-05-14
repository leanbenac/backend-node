// Operado Spread

const objetoEjemplo = {
    id:1,
    nombre: 'leandro',
    apellido: 'benac',
    pais: 'Argetina'
}

const newUsuario = {
    id:1,
    ...objetoEjemplo
};

console.log({objetoEjemplo});
console.log({newUsuario});

// spread con numero max
// const numeros = [1 ,2 ,3 ,4 ,5, 15, 28, 39 ,23 ]

// const mayor = Math.max(...numeros)

// console.log(mayor);


//////////////////////////////

// operador REST | 


const {nombre, apellido, ...resto} = objetoEjemplo

console.log({nombre});
console.log({apellido});
console.log({resto});