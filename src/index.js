const express=require("express");
const mitransformador=require("./transformadorFn.js");
const app=express();
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Servidor funcionando correctamente :)")
});

app.post("/transformar",(req,res)=>{
    try{
        const datos=req.body;
        if (!Array.isArray(datos)){
            return res.status(400).json({ mensaje: "Se espera un array en el body"});
        }
        const resultado=datos.map((e)=>{
            const fn=mitransformador[e.op];
            if (!fn) throw new Error("Operacion no soportada");
            return {...e, resultado: fn(e.texto)};
        });
        res.status(201).json(resultado);
    }catch(e){
        res.status(500).json({mensaje: e.message});
    }
});

app.listen(5000,()=>{
    console.log("APP iniciada pa...")
});