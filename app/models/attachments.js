// Example model

var mongoose = require('mongoose'),
  	Schema = mongoose.Schema;

var AttachmentsSchema = new Schema({
	title: String,
	url: String,
	text: String
});



mongoose.model('Attachments', AttachmentsSchema);

