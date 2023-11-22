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

app.get('/',async(req,res)=>{
    let send=mongoose.model('user_infos',sh);
    let api= await send.find();
    res.send(api);
});

app.listen(7000,()=>{
    console.log("api fetch");
})