const fs = require('fs')

const operaciones = async () => {
    const ruta = './new_promesas.txt'
    // ESCRIBIR
    try{
        await fs.promises.writeFile(ruta, 'Texto hecho con promesas')
    } catch (e){
        throw new Error('hubo un error de escritura');
    }

    // LEER
    try{
        const contenido = await fs.promises.readFile(ruta, 'utf8')
        console.log(contenido);
    }catch (e){
        throw new Error('hubo un error de lectura');
    }
        
}

operaciones()