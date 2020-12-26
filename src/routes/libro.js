const express = require('express');

const router = express.Router();

module.exports = router;

//POST '/libro' recibe: {nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null} devuelve 200 y {id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null} o bien status 413,  {mensaje: <descripcion del error>} que puede ser "error inesperado", "ese libro ya existe", "nombre y categoria son datos obligatorios", "no existe la categoria indicada", "no existe la persona indicada"
    
app.post("/libro", async (req, res)=>{
    try{
        //valido que me envie correctamente la info
        if(!req.body.nombre||!req.body.descripcion||!req.body.categoria_id){
            throw new Error("Faltaron completar datos");
           }

           //verifico que no existe ese libro previamente
           let query = "SELECT id FROM libro WHERE nombre = ?";
           let respuesta = await qy(query, [req.body.nombre.toUpperCase()]);
       
        if(respuesta.length > 0){
             throw new Error("Ese libro ya existe");
           }
           //verifico que exista el genero
           query = "SELECT id FROM categoria WHERE id = ?";
           respuesta = await qy(query, [req.body.categoria_id]);
           console.log(respuesta.length);

           if(respuesta.length == 0){
               throw new Error("esa categoria no existe");
           }
                       
        //Guardo el nuevo libro
               query = "INSERT INTO libro (nombre, descripcion, categora_id, persona_id) VALUES (?, ?, ?,?)";
               respuesta = await qy(query, [req.body.nombre.toUpperCase(), req.body.descripcion, req.body.categoria_id, req.body.persona_id]);
                
               query = "SELECT * FROM libro WHERE nombre = ?";
               respuesta = await qy(query, [req.body.nombre])
               res.status(200).send({"respuesta" : respuesta});
    
        }
        catch(e){
            console.error(e.message);
            res.status(413).send({"Error" : e.message});
        }
        });

        //FALTARIA HACER UNA VALIDACION PARA QUE INFORME SI HAY UN GENERO O UNA PERSONA QUE NO EXISTEN