import express from 'express';
import cors from 'cors'
import userloginRouter from './routers/userAuth.router';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.use('/api/',userloginRouter);


app.get('/',(req,res)=>{
    console.log(req.body);
    res.send("Hello from typescript server")
})

app.listen(PORT,()=>console.log(`server started on port ${PORT}`));
