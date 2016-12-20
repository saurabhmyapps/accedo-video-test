exports.ViewingSession = Backbone.Model.extend({
	urlRoot: "/api/v1/movies/viewed",
	// parse: function(response){
	// 	this.set("id", response.sessionId)
	// 	this.videosViewed = response.videosViewed
	// }
})
