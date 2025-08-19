

function errorHandler (err,_,res,next){
    const {name} = err

    const errors = {
        "NOT_FOUND":()=> res.status(400).json({error: "No existe ningun recurso con ese numero."}),
        "DEFAULT":()=> res.status(400).json({error: "Ha ocurrido un error."}),
        "MulterError": ()=>{
            const {code} = err

            if (code =="LIMIT_FILE_SIZE") return res.status(400).json({error: "El tamaño maximo permitido para una imagen es 5MB"})
            else if (code =="NO_SUPPORTED_FILE") return res.status(400).json({error: "El tipo de archivo seleccionado no es permitido"})
        }
    }

    console.log(err)

    return errors[name] ? errors[name]() : errors["DEFAULT"]()
}

export default errorHandler