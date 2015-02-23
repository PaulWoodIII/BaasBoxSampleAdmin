var app = app || {};

app.singleArtwork = Backbone.Model.extend({
	
	defaults :{
		title : "missing title",
		artistName : "missing artist",
        detailDescription: "-",
        materials: "-",
        auctionHouse: "-",
        auctionDate: "-",
        salesPrice: "-",
        higherEstimate: "-",
		lowerEstimate: "-",
        image: "-",
	},
		//     constructor: function() {
		// Backbone.Model.apply(this, arguments);
		// console.log("made a new artwork");
		//     },
});