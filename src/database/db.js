import mysql from "mysql2/promise"

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,   
    user: 'root',
    password: 'sua_senha',
    database: 'pokedex',
});

connection.then(() => {
    console.log('Conectado ao banco de dados')
}).catch((error) =>{
    console.error(error.message)
    throw new Error('Erro ao conectar ao banco de dados')
})

export default connection