

$(document).ready(function() {
	
	BaasBox.setEndPoint("http://localhost:9000");
	BaasBox.appcode = "1234567890";
    BaasBox.fetchCurrentUser();
	
	
	// Backbone.ajax = function() {
	// 	var args = Array.prototype.slice.call(arguments, 0);
	//          if (BaasBox.getCurrentUser()) {
	//            args[0]['data']['X-BB-SESSION'] = BaasBox.getCurrentUser().token;
	//          }
	//          args[0]['data']['X-BAASBOX-APPCODE'] = BaasBox.appcode;
	//
	//     return Backbone.$.ajax.apply(Backbone.$, args);
	// };
	
	//     BaasBox.setCurrentUser(	{"roles":["administrator"],
	// "token": "613d7b2e-4904-498d-91b3-72edba70dab9",
	// "username" : "admin"});




		
	// var artworkGroupView = new app.artworksCollectionView({
	// 	collection: artworks
	// });
	// $("#allArtworks").html(artworkGroupView.render().el);
	//
	// $("#next").click(function() {
	// 	artworks.getNextPage();
	// });
	// $("#prev").click(function() {
	// 	artworks.getPreviousPage();
	// });

	// $("#search").click(function() {
	// 	console.log("Search");
	// 	var searchString = document.getElementById('searchInput').value;
	// 	console.log("Search for:", searchString);
	//
	// 	BaasBox.loadCollectionWithParams("artworks", {
	// 		where: "artistName CONTAINSTEXT '" + searchString + "'",
	// 		page: 0,
	// 		recordsPerPage: BaasBox.pagelength
	// 	})
	// 		.done(function(res) {
	// 			console.log("res ", res);
	// 			var artworklist = _.map(res, function(art) {
	// 				console.log("artwork ", art);
	// 				var returner = new app.singleArtwork(art);
	// 				return returner;
	// 			});
	// 			console.log("artworklist ", artworklist);
	// 			var artworkGroup = new app.artworksCollection(artworklist);
	// 			var artworkGroupView = new app.artworksCollectionView({
	// 				collection: artworkGroup
	// 			});
	//
	// 			$("#allArtworks").html(artworkGroupView.render().el);
	//
	// 		})
	// 		.fail(function(error) {
	// 			console.log("error ", error);
	// 		});
	// });




	var Artwork = Backbone.Model.extend({
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
		}
	});
		
	var Artworks = Backbone.PageableCollection.extend({
		model: Artwork,
	    state: {
	      // You can use 0-based or 1-based indices, the default is 1-based.
	      // You can set to 0-based by setting ``firstPage`` to 0.
	      firstPage: 0,
		  pageSize: 200,
	    },
	    queryParams: {	
          where: null,
          totalPages: null,
	      totalRecords: null,  
	      pageSize: "recordsPerPage",
          //fields: "title,artistName,id,materials,auctionHouse,auctionDate,salesPrice,higherEstimate,lowerEstimate"
		  // sortKey: "where",
	      // order: "orderBy",
	      // directions: {
	      //   "-1": "asc",
	      //   "1": "desc"
	      // }
	  
	    },
		url: 'http://localhost:9000/plugin/helpers.activeArtist/',
	    parseRecords: function (resp) {
	      return resp.data;
	    }
	});

	var artworks = new Artworks();

	// Column definitions
	var columns = 
	[
	{name: "id", label: "ID", editable: false, cell: "string"}, 
	{name: "title", label: "Title", cell: "string" }, 
	{name: "artistName",label: "Artist",cell: "string"},
    {name: "materials",label: "materials",cell: "string"},
    {name: "auctionHouse",label: "auctionHouse",cell: "string"},
    {name: "auctionDate",label: "auctionDate",cell: "string"},
    {name: "salesPrice",label: "salesPrice",cell: "string"},
    {name: "higherEstimate",label: "higherEstimate",cell: "string"},
    {name: "lowerEstimate",label: "lowerEstimate",cell: "string"},
	];

	// Initialize a new Grid instance
	var grid = new Backgrid.Grid({
	  columns: columns,
	  collection: artworks,
	});
    
	var paginator = new Backgrid.Extension.Paginator({
      renderIndexedPageHandles: false,
      collection: artworks,
      controls: {
        rewind: null,
        fastForward: null
      }
    });
	
	// Render the grid and attach the Grid's root to your HTML document
	var $allArtworks = $("#allArtworks");
	$allArtworks.append(grid.render().el);
	$allArtworks.after(paginator.render().el);
	
    BaasBox.login("admin", "admin")
	.done(function(user) {
		artworks.fetch();
	})
	.fail(function(err) {
		console.log("error ", err);
	})
	
	
	
	$("#search").click(function() {
		console.log("Search");
		var searchString = document.getElementById('searchInput').value;
		console.log("Search for:", searchString);
		artworks.queryParams.where = searchString;
		artworks.reset();
		artworks.fetch();
	});
	
});



