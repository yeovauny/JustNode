const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


const usuario = 'usuario'
const password = 'pass'

const url = `mongodb+srv://${usuario}:${password}@cluster0.sy1vg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const dbname = 'myFirstDatabase';

MongoClient.connect(url, (err,client) =>{

    assert.equal(err,null);

    console.log('Connected correctly to server');
    const db = client.db(dbname);
    const collection = db.collection('dishes');
    collection.insertOne({"name":"ultrapizza","description":"example description"}, (err,result) => 
    {
        assert.equal(err,null);
        console.log('After Insert: \n');
        console.log(result.ops);


        collection.find().toArray((err,docs)=>{
   
            assert.equal(err,null);
            console.log('Found: \n');
            console.log(docs);

            db.dropCollection("dishes", (err, result) => {
                assert.equal(err,null);

                client.close();
            });

        });
    });
       
});