module.exports = Backbone.View.extend({
	template: function(title){
		return $("<li>").addClass("list-group-item").html(title)
	},
	render: function(movies){
		this.$el.empty()

		for(var i in movies){
			var $item = this.template(movies[i].get("title"))
			this.$el.append($item)
		}

		return this
	}
})
