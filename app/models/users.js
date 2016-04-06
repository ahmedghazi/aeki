// Example model

var mongoose = require('mongoose'),
  	Schema = mongoose.Schema;

var UsersSchema = new Schema({
	date_created: {
        index: true,
        type: Date, default: Date.now
    },
    gender: {
        type: String
    },
	name: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    password: {
        type: String
    },
    birthday: {
        type: Date
    },
    job: {
        type: String
    },
    tel: {
        type: Number
    },
    email: {
        unique: true,
        index: true,
        type: String
    },
    date_event_whish: {
        type: Date
    },
    date_event: {
        type: Date
    },
    media_signature: {
        type: {type: Schema.Types.ObjectId, ref: 'Media'}
    },
    style: {
        type: Date
    },
    disponible: {
        type: Boolean
    },
    majeur: {
        type: Boolean
    },
    cgu: {
        type: Boolean
    },
    status: {
        type: Number,
        default: 0
    },
    type: {
        type: String
    },
    votes: {
        type: Array
    },
    voters: {
        type: [{type: Schema.Types.ObjectId, ref: 'User'}]
    },
    notes: {
        type: Array
    },
    noters: {
        type: [{type: Schema.Types.ObjectId, ref: 'User'}]
    },
});

UsersSchema.virtual('date')
  	.get(function(){
    	return this._id.getTimestamp();
  	});

mongoose.model('Users', UsersSchema);

