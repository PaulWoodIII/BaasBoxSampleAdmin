
var app = app || {};

app.singleArtworkView = Backbone.View.extend({

	tagName: "tr",
	className: "artworkListItem",
	
	template: _.template( $("#artworkElement").html() ),
	
	render: function() {
		var artistTemplate = this.template(this.model.toJSON());
		this.$el.html(artistTemplate);
		return this;
	},
	
});