const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promotionsSchema = new Schema({
    
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    label:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
},{
    timestamps: true
});
var Promotions = mongoose.model('Promotions',promotionsSchema);

module.exports = Promotions;
