const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const usuario = 'courseranodeexample';
const password = 'AKl3VcE9CySwSmmt';
const url = `mongodb+srv://${usuario}:${password}@cluster0.sy1vg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log('Connected correctly to server');

    var newDish = Dishes({
        name: 'Uthappizza',
        description: 'test'
    });

    newDish.save()
    .then((dish)=>{
        console.log(`Saving the ${dish}`);

       return Dishes.find({}).exec();

    })
    .then((dishes) =>{
        console.log(`Deleting ${dishes}`);

        return Dishes.remove({});
    })
    .then(() =>{
        console.log(`Clossing the connection with the database`);
        return mongoose.connection.close();
    })
    .catch((err) =>{
        console.log(`There is an error ${err}`);
    });

});

