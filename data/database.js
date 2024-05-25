const mongodb = require("mongodb");
const mongoDBClient = mongodb.MongoClient;

let database;
async function initDb() {
    const client = await mongoDBClient.connect('mongodb://localhost:27017')
    database = client.db('todo-list')
}

function getDb(){
    if (!database){
        throw new Error('connection to database not established!')
    }

    return database;
}

module.exports = {
    initDb : initDb,
    getDb : getDb
}
