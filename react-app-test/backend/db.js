const mongoose = require('mongoose');
const User = require('./models/User');

const url = 'mongodb+srv://ishan:ishan123@cluster0.kturuge.mongodb.net/cars'

const mongoDB = async() =>{
    try{
        await mongoose.connect(url, {useNewUrlParser : true});
        console.log('connected to mongodb');
    }
    catch(err){
        console.log(err);
    }
};

module.exports = {mongoDB , User};


