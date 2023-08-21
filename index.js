const express=require("express");



const {connect}=require("./db")
const app=express();
const cors=require("cors");
 const{userrouter}=require("./router/user.router")

app.use(cors());
 app.use(express.json());

app.use("/",userrouter)



app.listen(8090,async()=>{
    try{
        await connect
        console.log("connected to DB")
    }catch(error){
     console.log(error)
    }
    console.log("Server is Up!")
})