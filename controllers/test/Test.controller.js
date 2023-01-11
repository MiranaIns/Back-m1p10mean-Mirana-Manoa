const TestService = require('../../services/test/Test.service')

const TestController = {
    test: test
}

function test(req,res) {
    try {
        res.json(TestService.test()).status(200);
    }
    catch (e) {
        res.json({errors: "Test error",status: 400}).status(200);
    }
}

module.exports = TestController;