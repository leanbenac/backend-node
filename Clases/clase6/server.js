const http = require('http')

const server = http.createServer((req,res) => {
    res.end('Mi primer hola mundo en node')
})

const PORT = 8080;

server.listen(PORT, ( () => {
    console.log(`Servidor escuchando en el puerto ${PORT}...`)
}))