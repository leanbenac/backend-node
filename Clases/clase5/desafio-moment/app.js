import moment from 'moment';

const hoy = moment()

const fecha_nacimiento = moment('1988-07-29','YYYY-MM-DD')

if(fecha_nacimiento.isValid()) {
    console.log(`Desde mi nacimiento pasaron: ${hoy.diff(fecha_nacimiento, 'days')} dias`);
} else {
    console.log('fecha incorrecta');
}