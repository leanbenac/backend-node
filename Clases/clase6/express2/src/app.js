import express from 'express';

const app = express()

app.get('/unparam/:nombre', (req, res) => {

    console.log(req.params.nombre);

    res.send(`Hola, ${req.params.nombre}`);
});

app.get('/dosparams/:nombre/:apellido', (req, res) => {

    console.log(req.params);

    res.send(`Hola, ${req.params.nombre} ${req.params.apellido}`);
});

app.listen(8080, ( () => {
    console.log('Servidor escuchando en el puerto 8080...')
}))