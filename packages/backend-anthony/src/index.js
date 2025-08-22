import "dotenv/config"
import express from "express"
import BoucherRouter from "./routes/boucherRoute.js"
import cors from "cors"
import errorHandler from "./errorHandler.js"
import mysql2 from "mysql2/promise"    
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {join} from "path"


const app = express()
app.use(cors())
app.use(express.json())

let connection = null

const {HOST,DBPORT,USER,PASSWORD,DATABASE} = process.env

console.log(USER)

try{
    connection = await mysql2.createConnection({
        host: HOST,
        port: DBPORT,
        user: USER,
        password: PASSWORD,
        database: DATABASE
    })

    console.log("database connected!")
} catch (err){
    console.log(err)
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const destination = join(__dirname,"../../frontent-anthony/dist")

console.log(destination)
app.use(express.static(destination))

app.use("/api/bouchers", BoucherRouter({connection}))
app.use(errorHandler)

app.use((req, res) => {
    res.sendFile(join(destination, 'index.html'));
});


const port = process.env.PORT

app.listen(port, () => console.log("Server on port: ",port))