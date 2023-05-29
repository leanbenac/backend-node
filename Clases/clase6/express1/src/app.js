import express from 'express';

const app = express();

app.get('/bienvenida', (req, res) => {
    const htmlRes = '<p style="color: blue; font-size: 100px;">Hola mundo desde Express!</p>';
    res.send(htmlRes)
});

app.get('/usuario', (req, res) => {
    const usuario = {
        nombre: 'Leandro',
        apellido: 'Gado',
        edad: 33,
        correo: 'leandrogado@example.com'
    };
    res.send(usuario)
})

app.listen(8080, () => {
    console.log('Listening on 8080...');
})
