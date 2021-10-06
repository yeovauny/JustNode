const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');


const usuario = 'courseranodeexample'
const password = 'xzqhhw4tWwxmwRki'

const url = `mongodb+srv://${usuario}:${password}@cluster0.sy1vg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const dbname = 'myFirstDatabase';

MongoClient.connect(url, (err,client) =>{

    assert.equal(err,null);

    console.log('Connected correctly to server');
    const db = client.db(dbname);
    
   

   
    dboper.insertDocument(db,{name:"Eduardo", description:"Testing third"}, 'dishes',(result) =>{
      
      console.log('Was Insert Document'+result.ops);

      dboper.findDocuments(db,'dishes',(docs)=>{
          console.log(`Found Documents ${docs}`)

          dboper.updateDocument(db,{name:'Eduardo'},{description:"Updated Testing"},'dishes',(result) =>{

            console.log(`Updated document ${result.result}`);
            dboper.findDocuments(db,'dishes',(docs)=>{
                console.log(`Found Documents ${docs}`)

                
                db.dropCollection("dishes", (result) => {
                    console.log("Dropped Collection: ", result);

                    client.close();
                });

            });
          })
      });

    });
       
});