const mongoose = require('mongoose');

// const postSchema = mongoose.Schema({

//     title : {type : String},

//     content : {type : String}

// });


const postSchema2 = mongoose.model('postSchema2',{


    title : {type : String },

    content : {type : String},

    email  : {type : String}


});

 module.exports = postSchema2; 
