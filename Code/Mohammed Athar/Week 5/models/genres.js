var mongoose = require('mongoose');

var generSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    create_date:{
        type:Date,
        default:Date.now
    }
});

var Genre = module.exports = mongoose.model('Geners', generSchema);

//Get Genres
module.exports.getGeners = function(callback, limit){
    Genre.find(callback).limit(limit);
}

module.exports.addGener= function(geners, callback){
    Genre.create(geners, callback);
}

