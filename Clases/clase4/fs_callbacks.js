const fs = require('fs')


// // lee el archivo
// const contenido = fs.readFile('./hola.txt','utf8', (error, contenido) => {
//     if(error){
//         console.log(('hubo un error'));
//     }else {
//         console.log('lectura conrecta');
//         console.log(contenido);
//     }
// })

// console.log(contenido);
// // crea y escribi archivo
// fs.writeFile('./test_async.txt', 'prueba callback con async', error => {
//     if(error){
//         console.log('hubo un error');
//         console.log(error.message);
//     } else {
//         console.log('lectura correcta');
//     }
// } )


// anidacion escribir + leer
fs.writeFile('./prueba_anidacion.txt', 'holaaaa, pudiste !!!!', error => {
    if(error){
        console.log('hubo un error');
        console.log(error.message);
    } else {
        console.log('escritura correcta');
        fs.readFile('./prueba_anidacion.txt', 'utf8', (error,contenido) => {
            if(error){
                console.log('hubo un error de lectura');
                console.log(error.message);
            } else {
                console.log('lectura correcta');
                console.log(contenido);
            }
        })
    }
} )