const TestService = require('../../services/test/Test.service')

const TestController = {
    test: test
}

function test(req,res) {
    try {
        const db = req.app.get('db');
        let {mail, mdp} = req.body;
        TestService.register(db, mail, mdp);
        res.redirect('/');
    }
    catch (e) {
        res.json({errors: "Test error",status: 400}).status(200);
    }
}

module.exports = TestController;