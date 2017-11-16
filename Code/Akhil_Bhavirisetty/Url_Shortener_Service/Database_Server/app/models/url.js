var mangoose = require('mangoose');
var Schema = mangoose.Schema;

//Defining the schema of the url_mapping Collection
var url_map_schema = new Schema({
    short_url: String,
    original_url: String,
    visits: Number
});

//Creating custom Mangoose Method to Map the incoming data to the schema
url_map_schema.methods.assign = function(params,cb) {
    // Assigning the data from the incoming message to their corresponding fields
    this.short_url = params.short_url;
    this.original_url = params.original_url;
    return this.name;
  };

//Creating the Mangoose Model which acts a constructor
var Url_map = mangoose.model('Url_map',url_map_schema);

module.exports = Url_map;