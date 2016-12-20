var Router = require("koa-router")
var handlers = require("../handlers")

var public = exports.public = new Router()
var api = exports.api = new Router()

public
	.use(handlers.viewingSession)
	.get("/", handlers.indexHandler)

api
	.use(handlers.viewingSession)
	.param("movieid", handlers.movie.load)

	.get("/api/v1/movies", handlers.movies.getMovieList)
	.get("/api/v1/movies/viewed", handlers.movies.getViewedMovieList)
	.post("/api/v1/movies/viewed", handlers.movies.addViewedMovieList)
