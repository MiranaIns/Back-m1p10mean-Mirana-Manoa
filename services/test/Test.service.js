const TestService = {
    test: test
}
const collectionName = 'test';

function test(db){
    try {
        const collection = db.collection(collectionName);
        collection.insertOne({test : 'Hello World 3'});
    }
    catch (e){
        throw { error : 'Hello World Error'};
    }
}

module.exports = TestService;