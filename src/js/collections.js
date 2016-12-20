exports.Movies = Backbone.Collection.extend({
	url: "/api/v1/movies",
	model: Backbone.Model.extend({})
})
