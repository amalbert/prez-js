	var mongoose = require('mongoose')
	  , Schema = mongoose.Schema;
	 
	var userSchema = new Schema({
		id: Number,
	    email: {type: String, required: true, unique: true}, 	// db.users.ensureIndex( { "email": 1 }, { unique: true } )
		password: String,
		lastLocation: [Number, Number],
	});
	userSchema.index({'lastLocation': '2dsphere'});				// db.users.ensureIndex({'lastLocation': '2dsphere'})

	module.exports = mongoose.model('User', userSchema);


