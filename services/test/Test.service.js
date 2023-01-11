const TestService = {
    test: test
}

function test(){
    try {
        return {test : 'Hello World'}
    }
    catch (e){
        throw { error : 'Hello World Error'};
    }
}

module.exports = TestService;