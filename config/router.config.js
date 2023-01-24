const TestRouter = require('../routes/test/Test.route')
const AuthentificationRouter = require('../routes/authentification.route')
const AdminAuthentificationRouter = require('../routes/adminAuthentification.route')
const configureRouter = (app) => {
    app.use('/', TestRouter);
    app.use('/authentification', AuthentificationRouter)
    app.use('/admin/authentification', AdminAuthentificationRouter)
}

module.exports = configureRouter