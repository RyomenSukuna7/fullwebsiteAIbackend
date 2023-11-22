let server=require('express');
let mongoose=require('mongoose');
let cors=require('cors');

let app=server();

app.use(server.json());
app.use(cors());
app.use(server.urlencoded({extended:true}));

mongoose.connect('mongodb://127.0.0.1:27017/user',{useNewUrlParser:true,useUnifiedTopology:true}).then((resp)=>{
    console.log("connected")
}).catch((error)=>{
    console.log("some error comes");
    console.log(error);
});

let sh=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    text:{
        type:String
    }

});

// app.post('/send',(req,res)=>{
//    let send=mongoose.model('user_infos',sh);
//         let name=req.body.name;
//         let email=req.body.email;
//          let text=req.body.text;
//          try{
//          let data=new send({name,email,text});
//          let saves=data.save();
//          return saves;
//          }
//          catch(error){
//             if(error.code===11000 && error.keyPattern.email===1){
//                 console.log("this is an duplicate error")
//             }
//             else{
//                 console.log("user not inserted");
//             }
//          }
   

   
// });


// chatgpt

app.post('/send', async (req, res) => {
  console.log(req.body);
    const UserModel = mongoose.model('user_infos', sh);
    console.log(req.body);
    const { name, email, text } = req.body;
    try {
      const data = new UserModel({ name, email, text });
      return await data.save();
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.email === 1) {
        console.log("Duplicate key error for email.");
        res.status(400).json({ message: 'Email address already exists' });
      } else {
        console.error("Error inserting user:", error);
        res.status(500).json({ message: 'Error inserting user' });
      }
    }
  });
  

//  app.get('/',async(req,res)=>{
//      let send=mongoose.model('user_infos',sh);
//      let api= await send.find();
//      res.send(api);
// });

app.listen(8000,()=>{
    console.log("i am listening");
})