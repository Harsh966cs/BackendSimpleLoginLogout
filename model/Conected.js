const express = require("express")
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.DB_URL
console.log(url)

const conected = async ()=>{
    try {
        const connection = await mongoose.connect(url);
        console.log("Mongoose conected sucsfully");
    } catch (error) {
        console.error(error);
    }
}

 module.exports = conected;