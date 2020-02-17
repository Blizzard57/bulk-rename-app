const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Route 
const user = require('./routes/user');
app.use('/user',user);

if(process.env.NODE_ENV === 'production'){
    app.user(express.static('../frontend/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'..','frontend','build','index.html'));
    });
}

const uri = process.env.mongodb || 'mongodb://localhost:27017/users'

// MogoDB
mongoose.connect(uri,{
    useNewUrlParser: true,
    useFindAndModify: false
},(err)=>{
    if(err){
        console.log("Unable to connect")
        process.exit(1);
    }
    else{
        console.log("Connected Sucessfully")
    }
})

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Started Listening on ${port}`);
})