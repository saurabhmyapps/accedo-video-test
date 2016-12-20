var ViewingSession = require("mongoose").model("ViewingSession")

exports.load = function *(movieId, next){
	this.movieId = movieId
	yield next
}
