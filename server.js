const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient
const app = express();
const configureRouter = require('./config/router.config')
const notFoundMiddleware = require("../middlewares/notFound.middleware");
const errorMiddleware = require("../middlewares/error.middleware");
const passport = require('passport');
const { jwtStrategy } = require('../config/passport.config');

/* Middlewares */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

/* Router */
configureRouter(app);

app.listen(3000, function () {
    console.log('Listening on 3000 ...');
});
