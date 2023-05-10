setInterval(() => {
    // console.log('hello');
}, 2000);

let contador = 0
const intervalId = setInterval(() => {
    // console.log(({ intervalId}));

    contador++ 
    console.log({contador});
    if(contador > 5) {
        clearInterval(intervalId)
    }

}, 1000)


