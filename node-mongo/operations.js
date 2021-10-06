const assert = require('assert');

exports.insertDocument = (db, document, collection,callback) =>{
    const coll = db.collection(collection);
    console.log('Was saved the documents');
    return coll.insert(document);
};

exports.findDocuments = (db, collection,callback) =>{
    const coll = db.collection(collection);
    console.log('was searched some documents');
    return coll.find({}).toArray();
};

exports.removeDocument = (db, document, collection,callback) =>{
    const coll = db.collection(collection);
    console.log("delteld the document");
    return coll.deleteOne(document);

};

exports.updateDocument = (db, document,update, collection,callback) =>{
    const coll = db.collection(collection);
    console.log("Was updated the document");
    return coll.updateOne(document,{$set: update},null);
};