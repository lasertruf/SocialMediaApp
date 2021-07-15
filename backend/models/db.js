const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/socialDB', (err)=> {
    if(!err){
        console.log("Successful Connection");
    }
    else{
        console.log("Failed to Connect");

    }
});


module.exports = mongoose; 