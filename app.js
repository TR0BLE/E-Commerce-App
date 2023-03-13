require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./db/connect');
const morgan = require('morgan')
const app = express();
const port = process.env.PORT || 5000;

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(morgan('tiny'))
app.use(express.json())

app.get('/', (req, res) => {
    return res.json({ App: "E-Commerce" })
})
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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