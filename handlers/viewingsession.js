var ViewingSession = require("mongoose").model("ViewingSession")
var uuid = require("node-uuid")
var fakeAPI = require("../api.json")
var _ = require("lodash")

module.exports = function *(next) {
	var sessionId = this.cookies.get("sessionid")

	var viewingSession = this.viewingSession = yield ViewingSession.findOne({
		sessionId: sessionId
	}).exec()

	if (!sessionId || !viewingSession) {
		sessionId = uuid.v4()
		var viewingSession = new ViewingSession({sessionId: sessionId})
		this.viewingSession = yield viewingSession.save()
		this.cookies.set("sessionid", sessionId)
	}


	// In real life we should store and populate
	// the movie entries
	// var self = this

	// this.viewingSession.viewedEntries = fakeAPI.entries.filter(function(entry){
	// 	return _.contains(self.viewingSession.videosViewed, entry.id)
	// })

	yield next
}
