const express = require('express');
const conexion = require('../db/conexion');
const router = express.Router();


//POST '/libro' recibe: {nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null} devuelve 200 y {id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null} o bien status 413,  {mensaje: <descripcion del error>} que puede ser "error inesperado", "ese libro ya existe", "nombre y categoria son datos obligatorios", "no existe la categoria indicada", "no existe la persona indicada"
    
router.post("/libro", async (req, res)=>{
    try{
        //valido que me envie correctamente la info
        if(!req.body.nombre||!req.body.descripcion||!req.body.categoria_id){
            throw new Error("Faltaron completar datos");
           }

           //verifico que no existe ese libro previamente
           let query = "SELECT id FROM libro WHERE nombre = ?";
           let respuesta = await conexion.query(query, [req.body.nombre.toUpperCase()]);
       
        if(respuesta.length > 0){
             throw new Error("Ese libro ya existe");
           }
           //verifico que exista el genero
           query = "SELECT id FROM categoria WHERE id = ?";
           respuesta = await conexion.query(query, [req.body.categoria_id]);
           console.log(respuesta.length);

           if(respuesta.length == 0){
               throw new Error("esa categoria no existe");
           }
                       
        //Guardo el nuevo libro
               query = "INSERT INTO libro (nombre, descripcion, categoria_id, persona_id) VALUES (?, ?, ?,?)";
               respuesta = await conexion.query(query, [req.body.nombre.toUpperCase(), req.body.descripcion, req.body.categoria_id, req.body.persona_id]);
                
               query = "SELECT * FROM libro WHERE nombre = ?";
               respuesta = await conexion.query(query, [req.body.nombre])
               res.status(200).send({"respuesta" : respuesta});
    
        }
        catch(e){
            console.error(e.message);
            res.status(413).send({"Error" : e.message});
        }
        });
        
        //FALTARIA HACER UNA VALIDACION PARA QUE INFORME SI HAY UN GENERO O UNA PERSONA QUE NO EXISTEN


 //PUT '/libro/:id' y {id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null} devuelve status 200 y {id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null} modificado o bien status 413, {mensaje: <descripcion del error>} "error inesperado",  "solo se puede modificar la descripcion del libro

router.put("/libro/:id" , async (req, res)=>{ //Para modificar un libro
   
    try{
         if(!req.body.nombre || !req.body.descripcion || !req.body.categoria_id){
              throw new Error("No completaste los campos");
         }
 
         let query = "SELECT * FROM libro WHERE nombre = ? AND id <> ?";
         let respuesta = await conexion.query(query, [req.body.nombre, req.params.id]);
 
        
         if(respuesta.length >0){
             throw new Error("El libro que queres ingresar ya existe");
         }
 
         query = "UPDATE libro SET nombre = ?, descripcion = ?, categoria_id = ?, persona_id = ? WHERE id = ?";
         respuesta = await conexion.query(query, [req.body.nombre.toUpperCase(), req.body.descripcion, req.body.categoria_id, req.body.persona_id, req.params.id]);
 
         query = "SELECT * FROM libro WHERE id = ?";
         respuesta = await conexion.query(query, [req.params.id]);
         res.status(200).send({"Respuesta" : respuesta});
        
        }
        catch(e){
            console.error(e.message);
            res.status(413).send({"Error" : e.message});
        }
 
 
 });

 module.exports = router;