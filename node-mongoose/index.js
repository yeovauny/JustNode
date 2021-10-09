const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const usuario = 'courseranodeexample';
const password = 'AKl3VcE9CySwSmmt';
const url = `mongodb+srv://${usuario}:${password}@cluster0.sy1vg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// was added {autoIndex: false} por configuracion de librerias
const connect = mongoose.connect(url, {autoIndex: false});

connect.then((db)=>{
    console.log('Connected correctly to server');

    Dishes.create({
        name: 'Uthappizza',
        description: 'test'
    })
    .then((dish)=>{
        console.log(`Saving the ${dish}`);

       return Dishes.findByIdAndUpdate(dish._id,{
            $set: {description: 'Updated test'}
       },{
            new: true
       }).exec();

    })
    .then((dishes) =>{
        console.log(` ${dishes}`);

        dish.comments.push({
            rating: 5,
            comment: 'this is a commentss',
            author: 'Leonardo'
        });

        return dish.save();

    }).then(()=>{
        console.log(`is was deleted ${dishes}`);

        return Dishes.remove({}).exe();
    })
    .then(() =>{
        console.log(`Clossing the connection with the database`);
        return mongoose.connection.close();
    })
    .catch((err) =>{
        console.log(`There is an error ${err}`);
    });

});

