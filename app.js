require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Server is listening at port ${port}...`);
        })
    }
    catch (err) {
        console.log(err);
    }

}

start();