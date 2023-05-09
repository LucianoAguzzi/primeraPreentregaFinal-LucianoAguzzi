import express from "express";

const app = express();

const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use
app.listen(PORT,()=> {
    console.log(`server listening on port: ${PORT}`);
}) 


