import mysql from 'mysql'
require('dotenv').config()

//LOCALHOST
const userLocalhost = process.env.HOST
const passwordLocalhost = process.env.PASSWORD

//Conection with LocalHost for TEST
const localDB = mysql.createConnection({
    host: "localhost",
    user: userLocalhost,
    password: passwordLocalhost,
    database: "vertex"
})

// localDB.connect((erro) => {
//     if(erro){
//         console.log("Erro Connection MySQL", erro)
//         return
//     }
//     console.log("MySQL Connection Successfull!!")
// })

//AWS
const hostAWS = process.env.awsHOST
const userAWS = process.env.awsUSER
const passwordAWS = process.env.awsPASSWORD

//Conection with AWS Database SERVER
const awsDB = mysql.createConnection({
    host: hostAWS,
    user: userAWS,
    password: passwordAWS,
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