const fs = require("fs");

const contenido = fs.readFileSync("./hola.txt", "utf-8");
console.log(contenido);
console.log(typeof contenido);

//crear carpeta
// fs.mkdirSync('./despedidas')

//escribir en archivo
fs.writeFileSync('./despedidas/adios.txt', 'Ivan caos')

// agrear texto
// fs.appendFileSync('./hola.txt', ' nuevo texto ')

//borrar archivo
// fs.unlinkSync('./despedidas/adios.txt')

//validar si existe archivo
console.log(fs.existsSync( './hola.txt'));



