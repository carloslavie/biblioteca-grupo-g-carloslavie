const mysql = require('mysql');
const util = require('util');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'biblioteca_grupog'
});

conexion.connect((error) => {
    if(error){
        throw error;
    }
    console.log('Conexion exitosa');
});

// const qy = util.promisify(conexion.query).bind(conexion);
conexion.query = util.promisify(conexion.query).bind(conexion); 

module.exports = conexion;