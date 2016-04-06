// Example model

var mongoose = require('mongoose'),
  	Schema = mongoose.Schema;

var PostsSchema = new Schema({
	title: String,
	url: String,
	text: String
});



mongoose.model('Posts', PostsSchema);

