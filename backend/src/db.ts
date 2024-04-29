import mysql from 'mysql'

//Conection with LocalHost for TEST
const localDB = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'root',
    database: "vertex"
})

localDB.connect((erro) => {
    if(erro){
        console.log("Erro Connection MySQL", erro)
        return
    }
    console.log("MySQL Connection Successfull!!")
})

const awsDB = mysql.createConnection({
    host: "database-vertex.cnaask4oarv0.us-east-2.rds.amazonaws.com",
    user: "adminG",
    password: "Amora0109",
    database: "vertex"
})

awsDB.connect((erro) => {
    if(erro){
        console.log("Erro Connection AWS DB", erro)
        return
    } 
    console.log("AWS DB Connection Successfull!")
})

export { localDB, awsDB }