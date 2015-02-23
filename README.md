#BaasBox Admin

assume that all your admins will be on a modern browser, frankly becasue if you are in a tech company and still supporting older browsers you've already got enough problems to start trying out BaasBox.

#Dependencies

| Library  | What it is being used for |
| :------------- | :------------- |
| JQuery  | Because...Duh  |
| Underscore.js  | Collection manipulations |
| Bootstrap  | provides style without thinking about it  |
| Backbone  | A library for MVC.   |
| Backbone.paginator  | A subclass of backbone.collection that supports paging   |
| Backgrid  | HTML data grid widget that works well with Backbone.js and backbone.paginator  |


#BaasBox.js

Baasbox provides a javascript library for connecting to a server. It uses jQuery for requests and once you've signed in using it's login method all future request to the server use the correct BaasBox headers for authentication.

#Login

```javascript

BaasBox.login("admin", "admin")
.done(function(user) {
console.log("Logged in ", user);
})
.fail(function(err) {
console.log("error ", err);
})

```

#Data Grid Setup

```javascript

//This is a model that I assume is in your database.
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
// You can use 0-based or 1-based indices, Baasbox is 0 based, the default is 0-based.
// You can set to 0-based by setting ``firstPage`` to 0.
firstPage: 0,
pageSize: 200,
},
queryParams: {
//here we add the "where" queryParam which baasbox uses for filtering, it will be set when we add search
where: null,
// we will add these after the first response from the server is given to us,
totalPages: null,
totalRecords: null,  
pageSize: "recordsPerPage",
//BaasBox lets us define which fields we need to return in the response if the dataobject itself has more than the grid needs to display
fields: "title,artistName,id,materials,auctionHouse,auctionDate,salesPrice,higherEstimate,lowerEstimate"
},
url: 'http://localhost:9000/document/artworks',
parseRecords: function (resp) {
//Records with BaasBox are stored in the data object of the response
return resp.data;
}
});

```	

Once the Backbone objects are defined we can add our BackGrid DataGrid code

```javascript

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
artworks.fetch();

```	

#Pagination

Backbone.paginator needs some setup on the server side to help with pagination, mostly what we need is to know how many items are available. this then lets the javascript prepare the total number of pages appropriate for paging.

To do this we need to use a BaasBox plugin and have it prepare the response to our clientside javascript. Thankfully the BaasBox plugin is also written in Javascript so its easy to understand if you are a clientside javascript programmer.

