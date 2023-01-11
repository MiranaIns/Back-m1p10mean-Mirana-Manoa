const TestRouter = require('../routes/test/Test.route')

const configureRouter = (app) => {
    app.use('/', TestRouter);
}

module.exports = configureRouter