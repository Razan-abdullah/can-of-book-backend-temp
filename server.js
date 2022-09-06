'use strict';

const express = require('express');
const cors = require('cors');
const { response } = require('express');
require('dotenv').config();
const mongoose = require('mongoose'); // 0 - import mongoose

const server = express();

server.use(cors()); //make my server open for any request

//IP : http://localhost:PORT

const PORT = process.env.PORT || 3100;

// mongoose config
mongoose.connect('mongodb://localhost:27017/books', {useNewUrlParser: true, useUnifiedTopology: true}); // 1 - connect mongoose with DB (301d35-cats)

const kittySchema = new mongoose.Schema({ //define the schema (structure)
    title: String,
    des: String,
    status:String
  });

const KittenModel = mongoose.model('Kitten', kittySchema); //compile the schem into a model

//seed data (insert initial data)
async function seedData(){
    const firstbook = new KittenModel({
        title :"JS book ",
        des:"for beginner",
        status:"favorite five"
    })

    const secondbook = new KittenModel({
      title :"green life ",
      des:"for beginner",
      status:"favorite five"
    })

    const thirdbook = new KittenModel({
      title :"behind the seen ",
      des:"Self development",
      status:"life changing "
    })

    await firstbook.save();
    await secondbook.save();
    await thirdbook.save();
}

// seedData(); //call seedData function


//Routes 
server.get('/',homeHandler);

server.get('/getbooks',getbooksHandler);
server.get('*',defualtHandler);





// http://localhost:3010/*
function defualtHandler(req,res) {
    res.status(404).send("Sorry, Page not found");
}


function homeHandler(req,res){

  res.status(200).send("Welcom in Home Rout ")


}

function getbooksHandler(req,res) {
    KittenModel.find({},(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(result);
            res.send(result);
        }
    })
}

server.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
})