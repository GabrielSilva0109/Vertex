import mysql from 'mysql'

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "vertex"
})

db.connect((erro) => {
    if(erro){
        console.log("Erro Conection MySQL", erro)
        return
    }
    console.log("MySQL Connection successful!!")
})

export { db }