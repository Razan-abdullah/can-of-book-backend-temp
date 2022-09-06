'use strict';

const express = require('express');
const cors = require('cors');
const { response } = require('express');
require('dotenv').config();
const mongoose = require('mongoose'); // 0 - import mongoose

const server = express();

server.use(cors()); //make my server open for any request

//IP : http://localhost:PORT

const PORT = process.env.PORT || 3010;

// mongoose config
mongoose.connect('mongodb://localhost:27017/301d35-cats', {useNewUrlParser: true, useUnifiedTopology: true}); // 1 - connect mongoose with DB (301d35-cats)

const kittySchema = new mongoose.Schema({ //define the schema (structure)
    title: String,
    descriptions:String,
    status:String,
  });

const KittenModel = mongoose.model('Kitten', kittySchema); //compile the schem into a model

//seed data (insert initial data)
    await book1.save();


// seedData(); //call seedData function


//Routes
server.get('/',homeHandler);
server.get('/books',bookHandler);
server.get('/getCats',getCatsHandler);
server.get('*',defualtHandler);


// http://localhost:3010/
function homeHandler(req,res) {
    res.send("Hi from the home route");
}

// http://localhost:3010/test
function bookHandler(req,res) {
    res.status(200).send("You are requesting the test route");
}

// http://localhost:3010/*
function defualtHandler(req,res) {
    res.status(404).send("Sorry, Page not found");
}


function getCatsHandler(req,res) {
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