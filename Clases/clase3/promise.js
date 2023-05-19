const dividir = (dividendo, divisor) => {
    return new Promise((resolve, reject) => {
        if(divisor === 0) {
            reject ('nose puede dividir por 0')
        } else {
            resolve(dividendo / divisor)
        }
        

    })
}

dividir(10, 2)
    .then(resultado => {
        console.log('nos fue bien', resultado)
        
    })
    .catch(error => {
        console.log('nos fue mal')
        console.error(error);
    })
    .finally(
        console.log('operacion finalizada')
    );