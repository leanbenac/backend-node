import UserManager from './managers/UserManager.js';

const userManager = new UserManager();

const env = async () => {
    let users = await userManager.getUsuarios()
    // console.log(users);

    let user = {
        nombre: 'Leandro',
        apellido: 'Benac',
        nombre_usuario: 'ivancaos',
        contrasena: 'musica88'
    }
    // cree un usuario
    // await userManager.crearUsuarios(user)
    // users = await userManager.getUsuarios()
    // console.log(users);

    //valido usuario
    await userManager.validarUsurarios('ivancaos','musica88'); // Logueado
    await userManager.validarUsurarios('ivancaos','musica877');// Contrasena invalida

    
}

env();