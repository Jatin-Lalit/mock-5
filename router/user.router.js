const express=require("express");
const {User}=require("../model/user.model");
const jwt = require("jsonwebtoken");
const {Appointment}=require("../model/appointments.model");
const bcrypt = require("bcryptjs");

const userrouter=express.Router();
userrouter.use(express.json());


userrouter.post("/signup",async(req,res)=>{
   
    try{
        const {email,password} =req.body;
        const isPresent=await User.findOne({email});
       
        if(isPresent){
            res.send("Already Register");
        }else{
     bcrypt.hash(password,5,async(err,hash_password)=>{
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
           
          }else{
            let user=new User({email,password:hash_password});
            await user.save();
            res.send("Registration Completed")
          }
        
     })
        }
    }catch(err){
        console.log(err)
    }
})

userrouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
              if (result) {
                res.send({
                  msg: "login success",
                  token: jwt.sign({ UserId: user._id }, "jatin", {
                    expiresIn: "100000m"
                  }),
                  
                });
              }
            });
          }
        }catch(err){
        console.log(err.massage)
    }
})

///////////////////////////////////////////////////
userrouter.post('/appointments', async (req, res) => {
    try {
      const {name,imageUrl,specialization,experience,location,slots,fee,} = req.body;
  
     
      const appointment = new Appointment({
        name,
        imageUrl,
        specialization,
        experience,
        location,
        date: new Date(), 
        slots,
        fee,
      });
  
      
      await Appointment.save();
  
      res.send({ message: 'Appointment created successfully', appointment });
    } catch (error) {
      console.error(error);
      res.send({ message: 'An error occurred' });
    }
  });


/////////////////////////////////////////////
  userrouter.get('/AllAppointments', async (req, res) => {
    try {
      const appointments = await Appointment.find(); 
      res.send(appointments);
    } catch (error) {
      
      res.send({ message: 'An error occurred' });
    }
  });

////////////////////////////////////////////
  userrouter.get('/filter', async (req, res) => {
    const { specialization } = req.query;
  
    try {
        let query = Appointment.find({specialization:specialization});
      res.send(query);
    } catch (error) {
      
      res.send({ message: 'An error occurred' });
    }
  });

/////////////////Search
userrouter.get('/Search', async (req, res) => {
    const { name } = req.query;
  
    try {
        let query = Appointment.find({name:name});
      res.send(query);
    } catch (error) {
      
      res.send({ message: 'An error occurred' });
    }
  });
/////////////////////////////////
userrouter.delete("/delete/:id",async(req,res)=>{
      
    const id=req.params.id;
    
    
    try{
        
            await Appointment.findByIdAndDelete({_id:id});
            res.send("deleted")
        
    }catch(err){
        console.log(err)
    }


});
//////////////////////////////////

userrouter.patch("/update/:id",async(req,res)=>{
    const paylode=req.body;
   
    try{
        
            await Appointment.findByIdAndUpdate({_id:id},paylode);
            res.send("updated")
        

    }catch(err){
        console.log(err)
    }
})



module.exports={
    userrouter
}