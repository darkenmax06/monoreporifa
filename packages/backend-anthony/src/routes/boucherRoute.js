import {Router} from "express"
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import multer from "multer"
import {join,extname} from "path"
import express from "express"

const __dirname = dirname(fileURLToPath(import.meta.url));
const destination = join(__dirname,"../../public/bouchers")

const storage = multer.diskStorage({
    filename: (req,file,cb)=>{
        const filename = crypto.randomUUID() + extname(file.originalname).toLowerCase()
        cb(null,filename)
    },
    destination
})

function getRandomTicket (aviableTickets){
    const index = Math.round((Math.random() * aviableTickets.length)-1)
    const ticket = aviableTickets[index]
    return ticket
}

const upload = multer({
        dest:destination,
        storage,
        limits:{
            fileSize:5000000
        },
        fileFilter: (req,file,cb)=>{
            const fileTypes = /jpg|png|jpeg/
            const mimetype = fileTypes.test(file.mimetype)
            const extName = fileTypes.test(extname(file.originalname))

            if (mimetype && extName) return cb(null,true)
            cb({name: "MulterError", code: "NO_SUPPORTED_FILE"})

        }
    }).single("image")

function BoucherRouter ({connection}){
    const router = Router()

    router.get("/validate" ,async (req,res,next)=>{
        const {phone} = req.query

        let query = `SELECT * FROM tickets WHERE number=?`

        try {
            const [result] = await connection.query(query,[phone])
            if (result.length < 1) return next({name: "NOT_FOUND"})
            res.json(result)
        }catch(err){
            return next(err)
        }
    })
  
    router.get("/ticket/:ticket" ,async (req,res,next)=>{
        const {ticket} = req.params

        let query = `SELECT * FROM tickets WHERE ticket="${ticket}" `

        try {
            const [result] = await connection.query(query)
            res.json(result)
        }catch(err){
            return next(err)
        }
    })

    router.get("/" ,async (req,res,next)=>{
        const {status} = req.query

        let query = `SELECT number,count(number) quantity, MIN(name) name, status FROM tickets WHERE status="${status}" GROUP BY number `

        try {
            const [result] = await connection.query(query)
            res.json(result)
        }catch(err){
            return next(err)
        }
    })
    
    router.get("/status/:status" ,async (req,res,next)=>{
        const {status} = req.params
        try {
            const [result] = await connection.query("SELECT * FROM tickets WHERE status=?",[status])
            console.log(result,status)
            res.json(result)
        }catch(err){
            return next(err)
        }
    })

    router.get("/number/:number" ,async (req,res,next)=>{
        const {number} = req.params
        try {
            const [result] = await connection.query("SELECT * FROM tickets WHERE number=? AND status='IN PROCESS'",[number])
            res.json(result)
        }catch(err){
            return next(err)
        }
    })

    router.get("/quantity" ,async (req,res,next)=>{
        try {
            const [[buyTickets]] = await connection.query("SELECT COUNT(*) FROM tickets")
            const [[withoutValidateTickets]] = await connection.query("SELECT COUNT(*) FROM tickets WHERE status = 'in process'")
            const [[invalidTickets]] = await connection.query("SELECT COUNT(*) FROM tickets WHERE status = 'INVALID'")
            const [[validTickets]] = await connection.query("SELECT COUNT(*) FROM tickets WHERE status = 'ACTIVE'")
            console.log(withoutValidateTickets)
            res.json({buyTickets: buyTickets["COUNT(*)"], totalTickets: 10000,withoutValidateTickets: withoutValidateTickets["COUNT(*)"], invalidTickets:invalidTickets["COUNT(*)"],validTickets:invalidTickets["COUNT(*)"] })
        }catch(err){
            return next(err)
        }
    })

    router.get("/:number" ,async (req,res,next)=>{
        const {number} = req.params
        try {
            const [query] = await connection.query("SELECT * FROM tickets WHERE number = ?",[number])
            res.json(query)
        }catch(err){
            return next(err)
    }
    })

    router.post("/", upload,async (req,res,next) => {
        const {name,number,quantity,payMethod} = req.body
        const {filename} = req.file

        if (!name) return next({name: "EMPTY_NAME"})
        else if (!number) return next({name: "EMPTY_NUMBER"})
        else if (number.length < 10) return next({name: "NUMBER_TOO_SHORT"})
        else if (number.length > 10) return next({name: "NUMBER_TOO_LONG"})
        else if (!quantity) return next({name: "EMPTY_QUANTITY"})
        else if (!payMethod) return next({name: "EMPTY_PAYMETHOD"})
        else if (!filename) return next({name: "EMPTY_IMAGE"})
        
        const times = parseInt(quantity)

        const [aviableNumbers] = await connection.query("SELECT * FROM aviableTickets")
        let numerosDisponibles = aviableNumbers.map(res => res.digito)

        for (let i =0;i<times;i++){
            if (numerosDisponibles.length<1){
                break;
            }
            const ticket = getRandomTicket(numerosDisponibles)
            numerosDisponibles = numerosDisponibles.filter(res => res != ticket)
            const [a] = await connection.query("INSERT INTO tickets (name,number,paymethod,boucher,ticket) values (?,?,?,?,?)",[name,number,payMethod,filename,ticket])
            await connection.query("DELETE from aviableTickets WHERE digito = ?",[ticket])
            
        }

        res.json({message: "Boletos comprados"})

    })

    router.put("/:ticket", async (req,res,next) => {
        const {ticket} = req.params
        const {status} = req.body
        
        try {
            const [result] = await connection.query("UPDATE tickets set status = ? WHERE ticket = ?", [status,ticket])

            if (status ==  "INVALID"){
                const [r] = await connection.query("INSERT INTO aviableTickets (digito) VALUES (?)", [ticket])
            }

            res.json(result)
        } catch (err) {
            return next (err)
        }
    })

    router.use("/images",express.static(destination))
    return router
}


export default BoucherRouter