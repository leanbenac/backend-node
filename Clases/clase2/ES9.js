// Spread

const Objeto = {
    id:1,
    nombre: 'leandro',
    apellido: 'benac',
    pais: 'Argetina'
}


// spread con numero max
const numeros = [1 ,2 ,3 ,4 ,5 ]

const mayor = Math.max(...numeros)

console.log(mayor);