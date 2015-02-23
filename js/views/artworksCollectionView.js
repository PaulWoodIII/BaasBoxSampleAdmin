
var app = app || {};

app.artworksCollectionView = Backbone.View.extend({

	tagName: "table",	
	className: "table",
	// template: _.template( $("#artworkCollectionElement").html() ),
	render: function() {
		var template = this.template();
		this.$el.html(template);
		this.collection.each(this.addArtwork,this);
		return this;
	},
	addArtwork: function(artwork){
		var artworkView = new app.singleArtworkView ({ model: artwork });
		this.$el.append(artworkView.render().el);
	}
	
});