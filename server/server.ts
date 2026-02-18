import express from 'express';

const app = express();
const PORT = 8000;

app.use(express.json());


app.get('/',(req,res)=>{
    console.log(req.body);
    res.send("Hello from typescript server")
})

app.listen(PORT,()=>console.log(`server started on port ${PORT}`));
