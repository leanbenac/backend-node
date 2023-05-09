


const mostrarLista = elementos => {
    if(elementos.length === 0) 
    return "lista vacia"

    elementos.forEach(elemento => console.log(elemento));

    return `el largo de arrays es ${elementos.length}`;
}


console.log(mostrarLista([]));
console.log(mostrarLista([1,2,3]));