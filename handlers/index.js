exports.movies = require("./movies")
exports.movie = require("./movie")
exports.viewingSession = require("./viewingsession")

var fakeAPI = require("../api.json")

exports.indexHandler = function *(next) {
	yield this.render("player", {
		entries: fakeAPI.entries,
		viewingSession: this.viewingSession
	})
}
