class Bicicleta {
    // propiedades
    color = 'blanco'
    aro = '28'
    marca = 'honda'

    constructor(color, aro, marca){
        this.color = color;
        this.aro = aro;
        this.marca = marca;

        console.log('bicicleta lista');
    }


    avanzar(){
        console.log('avanzamos!');
    }

    frentar(){
        console.log('frenaamos ');
    }


}

const bicicleta = new Bicicleta('azul',16, 'kymco');
console.log(bicicleta);
bicicleta.avanzar();



const bicicleta1 = new Bicicleta("negro",24, 'yamaha' )
console.log(bicicleta1);

