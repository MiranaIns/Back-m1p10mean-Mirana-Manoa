const TestRouter = require('../routes/test/Test.route')
const AuthentificationRouter = require('../routes/authentification.route')
const configureRouter = (app) => {
    app.use('/', TestRouter);
    app.use('/authentification', AuthentificationRouter)
}

module.exports = configureRouter