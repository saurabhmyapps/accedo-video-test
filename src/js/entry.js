var models = require("./models")
var collections = require("./collections")
var views = require("./views")
var globalEvents = require("./global-events")

var movies = new collections.Movies()
var viewingSession = new models.ViewingSession()

var movieCarouselView = new views.CarouselView({collection: movies, el: $(".carousel-inner")})
var viewedMovieListView = new views.ListView({model: viewingSession, el: $(".list-group")})

viewingSession.on("change", function(){
	var moviesViewed = movies.models.filter(function(entry){
		return _.contains(viewingSession.get("videosViewed"), entry.id)
	})

	viewedMovieListView.render(moviesViewed)
})

globalEvents.on("itemwatch", function(e, title){
	var orig = viewingSession.get("videosViewed")
	orig.push(title)
	viewingSession.trigger("change")
	viewingSession.save()
})

// initialize
movies.reset(movieEntries)
viewingSession.set("videosViewed", viewedMovieEntries)

