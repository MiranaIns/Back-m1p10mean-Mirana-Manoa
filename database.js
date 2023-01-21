const {MongoClient} = require("mongodb");

class PrivateSingleton {
    constructor() {
        const connectionString = 'mongodb+srv://mongo:mongo@cluster0.ih3purh.mongodb.net/?retryWrites=true&w=majority'
        let db;
        async function connectToDB(){
            const client = await MongoClient.connect(connectionString, { useUnifiedTopology: true });
            db = client.db('m1p10mean');
            return db;
        }
        let result = connectToDB();
        this.db = result;
    }
}
class Database {
    constructor() {
    }
    static getInstance() {
        if (!Database.db) {
            Database.db = new PrivateSingleton();
        }
        return Database.db.db;
    }
}
module.exports = Database;
