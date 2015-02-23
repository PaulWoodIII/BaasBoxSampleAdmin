var app = app || {};

app.artworksCollection = Backbone.PageableCollection.extend({
	mode: "infinite",
	model: app.singleArtwork,
    state: {

      // You can use 0-based or 1-based indices, the default is 1-based.
      // You can set to 0-based by setting ``firstPage`` to 0.
      firstPage: 0,
	  pageSize: 50,
      // Set this to the initial page index if different from `firstPage`. Can
      // also be 0-based or 1-based.
      currentPage: 0,

    },
    queryParams: {	  
      currentPage: "page",
      pageSize: "recordsPerPage",
      order: "orderBy",
      directions: {
        "-1": "asc",
        "1": "desc"
      }
	  
    },
	// constructor: function() {
	//   console.log("made a new artworksCollection");
	// },
	url: 'http://localhost:9000/document/artworks'
});