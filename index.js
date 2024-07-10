const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { errorGlobal } = require('./middleware/errorhandler');
const path = require('path');
require('dotenv').config()
const app = express()

// default middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/upload', express.static(path.join(__dirname, './upload')));

app.use("/api/v1/", routes)

app.use(errorGlobal);

const port = process.env.PORT || 8000
const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//Unhandled promise rejection
process.on("unhandledRejection", (reason, promise) => {

    console.log(`Shutt down server for reason: ${reason} and promise: ${promise}`);
    console.log(`Shutt down server due to Unhandled promise rejection`);
    //  serve close
    server.close(() => {
        process.exit(1);
    });
});