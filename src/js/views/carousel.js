var CarouselSlideView = require("./carouselslide")

module.exports = Backbone.View.extend({
	initialize: function(options){
		this.options = options
		this.subviews = []
		this.listenTo(this.collection, "reset", this.render)
	},
	render: function(){
		// remove all subviews first
		for(var i in this.subviews){
			this.subviews[i].remove()
		}

		this.subviews = []

		for(var i in this.collection.models){
			var view = new CarouselSlideView({
				model: this.collection.models[i],
				i: i
			})

			this.subviews.push(view)
			this.$el.append(view.render().$el)
		}

		this.$el.parent().carousel({
			interval: 10000,
			keyboard: true,
			pause: false
		})
	}
})
