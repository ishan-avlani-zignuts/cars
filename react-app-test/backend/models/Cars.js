


const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name : String,
    company : String,
    type : String,
    capacity : String,
    fueltype : String,
    rate : String,
    image : String,
});

const Cars = mongoose.model('Cars', carSchema,'cars');
module.exports = Cars;

