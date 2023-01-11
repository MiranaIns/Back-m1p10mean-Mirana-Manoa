const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const configureRouter = require('./config/router.config')


/* Middlewares */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Router */
configureRouter(app);

app.listen(3000, function() {
    console.log('listening on 3000');
});
