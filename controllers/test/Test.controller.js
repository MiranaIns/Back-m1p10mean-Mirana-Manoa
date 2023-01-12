const TestService = require('../../services/test/Test.service')

const TestController = {
    test: test
}

function test(req,res) {
    try {
        const db = req.app.get('db');
        TestService.test(db)
        res.redirect('/');
    }
    catch (e) {
        res.json({errors: "Test error",status: 400}).status(200);
    }
}

module.exports = TestController;