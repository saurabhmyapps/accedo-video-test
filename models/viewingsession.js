var mongoose = require("mongoose")
	, Schema = mongoose.Schema
	;

ViewingSessionSchema = new Schema({
	sessionId: {type: String},
	videosViewed: [{
		type: String
	}]
})

ViewingSessionSchema.index({sessionId: 1}, {unique: true})

module.exports = mongoose.model("ViewingSession", ViewingSessionSchema)
