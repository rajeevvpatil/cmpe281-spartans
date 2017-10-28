var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    price:{
        type:String,
        required:true
    },
    product_id:{
        type:String,
        required:true
    },
    image_url:{
        type:String
    },
    create_date:{
        type:Date,
        default:Date.now
    }
});

var Games = module.exports = mongoose.model('Games', gameSchema);

//Get Games
module.exports.getGames= function(callback, limit){
    Games.find(callback).limit(limit);
}

module.exports.getGamesById= function(id, callback){
    Games.findById(id, callback);
}

module.exports.addGames= function(games, callback){
    Games.create(games, callback);
}
