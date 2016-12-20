var ViewingSession = require("mongoose").model("ViewingSession")

exports.getMovieList = function *(next) {
	this.body = fakeAPI.entries
}

exports.getViewedMovieList = function *(next) {
	this.body = {
		sessionId: this.viewingSession.sessionId,
		videosViewed: this.viewingSession.videosViewed
	}
}

exports.addViewedMovieList = function *(next){
	var movieList = this.request.body.videosViewed
	var sessionId = this.viewingSession.sessionId

	yield ViewingSession.update({sessionId: sessionId}, {
		$addToSet: {
			videosViewed: {
				$each: movieList
			}
		}
	}).exec()

	this.status = 204
}
