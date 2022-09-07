"use strict";

const express = require("express");
const cors = require("cors");
const { response } = require("express");
require("dotenv").config();
const mongoose = require("mongoose"); // 1- import mongoose

const server = express();
server.use(express.json());

server.use(cors()); //make my server open for any request

//IP : http://localhost:PORT

const PORT = process.env.PORT || 3100;

// mongoose config
// mongoose.connect("mongodb://localhost:27017/book_stor", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,}); // 1 - connect mongoose with DB (301d35-cats)
mongoose.connect('mongodb://razan:1234@cluster0-shard-00-00.pl8mj.mongodb.net:27017,cluster0-shard-00-01.pl8mj.mongodb.net:27017,cluster0-shard-00-02.pl8mj.mongodb.net:27017/?ssl=true&replicaSet=atlas-1lgzyk-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}); // 1 - connect mongoose with DB (301d35-cats)

const kittySchema = new mongoose.Schema({
  //define the schema (structure)
  title: String,
  des: String,
  status: String,
});

const KittenModel = mongoose.model("Kitten", kittySchema); //compile the schem into a model

//seed data (insert initial data)
async function seedData() {
  const firstbook = new KittenModel({
    title: "JS book ",
    des: "for beginner",
    status: "favorite five",
  });

  const secondbook = new KittenModel({
    title: "green life ",
    des: "for beginner",
    status: "favorite five",
  });

  const thirdbook = new KittenModel({
    title: "behind the seen ",
    des: "Self development",
    status: "life changing ",
  });

  await firstbook.save();
  await secondbook.save();
  await thirdbook.save();
}

// seedData(); //call seedData function

//Routes
server.get("/", homeHandler);
server.get("/getbooks", getbooksHandler);
server.delete("/deletebook/:id", deletebookHandler);
server.post("/addbook", addBookHandler);
server.put("/update/:id", updatebookHandler);
server.get("*", defualtHandler);

//////////////////////done 5

async function addBookHandler(req, res) {
  console.log(req.body);

  const { title, des, status } = req.body; //Destructuring assignment
  await KittenModel.create({
    title: title,
    des: des,
    status: status,
  });

  KittenModel.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.status(200).send(result);
    }
  });
}


function updatebookHandler(req, res) {
  const id = req.params.id;
  const { title, des, status } = req.body; //Destructuring assignment
  console.log(req.body);
  KittenModel.findByIdAndUpdate(id, { title, des, status }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      KittenModel.find({}, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          // console.log(result);
          res.send(result);
        }
      });
    }
  });
}


///////done 4
// http://localhost:3100/*
function defualtHandler(req, res) {
  res.status(404).send("Sorry, Page not found");
}

//////////////// done 1
function homeHandler(req, res) {
  res.status(200).send("Welcom in Home Rout ");
}
/////// done 2
function getbooksHandler(req, res) {
  KittenModel.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
}
//////done 3
function deletebookHandler(req, res) {
  const bookId = req.params.id;
  KittenModel.deleteOne({ _id: bookId }, (err, result) => {
    KittenModel.find({}, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result);
        res.send(result);
        // res.send("hifrom delet rout ");
      }
    });
  });
}
server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
