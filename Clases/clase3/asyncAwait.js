const dividir = (dividendo, divisor) => {
    return new Promise((resolve, reject) => {
        if(divisor === 0) reject ({
            errorMsg: 'nose puede dividir por cero', statusCode: 422
        })

        resolve(dividendo / divisor)
    })
}

const funcionAsyncrona = async () => {

    try{
        const division =  await dividir(4, 2);
        console.log(division);
        console.log(typeof division);

    } catch (error) {
        console.log('hubo un problema', error);
    }

}

funcionAsyncrona();