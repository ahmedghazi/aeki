// Example model

var mongoose = require('mongoose'),
  	Schema = mongoose.Schema;

var CommentsSchema = new Schema({
	title: String,
	url: String,
	text: String
});

CommentsSchema.virtual('date')
  	.get(function(){
    	return this._id.getTimestamp();
  	});

mongoose.model('Comments', CommentsSchema);

