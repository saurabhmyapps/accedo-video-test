var globalEvents = require("../global-events")

module.exports = Backbone.View.extend({
	className: "item",
	events: {
		"click img": "playVideo",
		"keyup img": function(e){
			if (e.keyCode == 13){
				e.currentTarget.click()
			}
		}
	},
	playVideo: function(){
		globalEvents.trigger("itemwatch", this.model.get("id"))
		this.$video[0].webkitRequestFullscreen()
		this.$video[0].play()

		var self = this

		$(document).one("webkitfullscreenchange", function(){
			$(document).one("webkitfullscreenchange", function(){
				if(!document.webkitFullscreenElement){
					self.$video[0].pause()
				}
			})
		})
	},
	initialize: function(options){
		this.options = options
	},
	render: function(){
		var src = this.model.get("images")[0].url
		var caption = this.model.get("title")

		var $image = $("<img>").attr({src: src, tabIndex: 1})
		var $caption = $("<div>").addClass("carousel-caption").html(caption)

		this.$video = $("<video>").attr({
			src: this.model.get("contents")[0].url,
			preload: "none"
		})

		this.$el
			.append($image)
			.append($caption)
			.append(this.$video.hide())

		if(this.options.i == 0) {
			this.$el.addClass("active")
		}

		return this
	}
})
