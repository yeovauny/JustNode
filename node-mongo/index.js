const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');


const usuario = 'usuario'
const password = 'password'

const url = `mongodb+srv://${usuario}:${password}@cluster0.sy1vg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const dbname = 'myFirstDatabase';

MongoClient.connect(url).then((client) =>{

    
    console.log('Connected correctly to server');
    const db = client.db(dbname);
    
   

   
    dboper.insertDocument(db,{name:"Eduardo", description:"Testing third"}
    , 'dishes').then((result) =>{
        console.log('Was Insert Document'+result.ops);

        return dboper.findDocuments(db,'dishes');
    })
    .then((docs) =>{
        console.log(`Found Documents ${docs}`);
        return dboper.updateDocument(db,{name:'Eduardo'},{description:"Updated Testing"},'dishes');
    })
    .then((result) =>{
        console.log(`Updated document ${result.result}`);
        return dboper.findDocuments(db,'dishes');
    })
    .then((docs)=>{
        console.log("Found Updated Documents:\n", docs);
        return db.dropCollection("dishes");
    })
    .then((result)=>{
        console.log(`Dropped Collection ${result}`);
         return client.close();

    })
    .catch((err) => console.log(err));
   
       
})
.catch((err) => console.log(err));