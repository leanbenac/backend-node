const fs = require('fs');

const contenido = fs.readFileSync('./hola.txt', 'utf8')

console.log(contenido);



const fecha = new Date().toLocaleDateString();



fs.writeFile('fecha.txt', `Hoy es un gran dia ${fecha}`, (error) => {
    if (error) return console.log(error);
    console.log('El archivo ha sido creado exitosamente.');
    fs.readFile('./fecha.txt', 'utf8', (error,result) => {
        if(error) return console.log(error);
        console.log(result);

    })
  });