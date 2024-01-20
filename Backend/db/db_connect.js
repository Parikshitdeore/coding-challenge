require('dotenv').config();

const fetchData = require("./fetchData")
const mongoose = require("mongoose");
const Transaction = require("../models/transaction")
const mongoURI = process.env.MONGODB_URI;

const initializeDatabase = async () => {
  try {
    console.log(mongoURI)
    mongoose.connect(mongoURI)
    const db = mongoose.connection;
    if (db) {
      db.on('error', console.error.bind(console, 'MongoDB connection error:'));
      db.once('open', () => {
      console.log('Connected to MongoDB');
      });
    }
    //Feeding data to MongoDB
      // const transactions = await fetchData();
      // const result =await Transaction.insertMany(transactions);
      // if(result){console.log("Data loaded successfully")}

  } catch (e) {
    console.log(`Failed to connect` + e);
  }
};

module.exports = initializeDatabase;