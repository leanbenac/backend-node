const fs = require('fs');

const fecha = new Date().toLocaleDateString();
const hora = new Date().toLocaleTimeString()

fs.writeFile('fecha.txt', `Hoy es un gran dia ${fecha}... Hora: ${hora}`, (error) => {
    if (error) return console.log(error);
    console.log('El archivo ha sido creado exitosamente.');
    fs.readFile('./fecha.txt', 'utf8', (error,result) => {
        if(error) return console.log(error);
        console.log(result);

    })
});