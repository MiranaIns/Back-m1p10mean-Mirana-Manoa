const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();
const configureRouter = require('./config/router.config')

const connectionString = 'mongodb+srv://mongo:mongo@cluster0.ih3purh.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database ...');
        const db = client.db('m1p10mean');

        /* Middlewares */
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());

        /* Router */
        configureRouter(app);

        app.listen(3000, function () {
            console.log('Listening on 3000 ...');
        });
    })
    .catch(console.error)
