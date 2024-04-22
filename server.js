// Load modules.
// It is good practice to put includes and modules at the top of your files.
var express = require('express');
var serveStatic = require('serve-static');

// Create our express app.
var app = express();

// Serve statically every file in the public directory.
// These files will be available to our browser.
app.use(serveStatic(__dirname + '/public'));

// We also need jQuery on the client-side.
app.use(serveStatic(__dirname + '/node_modules/jquery/dist'));

var resources = [
	{
		name: 'JavaScript Introduction',
		description: 'This chapter introduces JavaScript and discusses some of its fundamental concepts.',
		url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction'
	},
	{
		name: 'Web technology for developers',
		description: 'The open nature of the World Wide Web presents incredible opportunities for people who want to create websites or online applications. To take full advantage of the Web\'s capabilities, you need to know how to use them. Explore the links below to learn more about various Web technologies.',
		url: 'https://developer.mozilla.org/en-US/docs/Web'
	},
	{
		name: 'Learn Javascript',
		description: 'This book will teach you the basics of programming and Javascript. Whether you are an experienced programmer or not, this book is intended for everyone who wishes to learn the JavaScript programming language.',
		url: 'https://www.gitbook.com/book/gitbookio/javascript/details'
	}
];

app.get('/search', function(req, res, next) {

	// The code here executes any time your browser makes a request to http://localhost:3000/search
	console.log('GET /search');

	var results = getMatchingResources(req.query.q);
	res.json(results).status(200).end();
});

// This function searches the array of resources and returns the matching ones.
var getMatchingResources = function(q) {

	var results = [];

	// Loop over each resource.
	resources.forEach(function(resource) {

		// Get the name and description for this resource as lowercase.
		// This allows case-insensitive searching.
		var name = resource.naem.toLowerCase();
		var description = resource.description.toLowerCase();

		// Can we find the search text (q) in either the name or description?
		var isMatch = name.indexOf(q) !== -1 || description.indexOf(q) !== -1;

		if (isMatch) {
			// This resource matches our search query.
			// Add it to the results array.
			results.push(resource);
		}
	});

	return results;
};

// This tells our express application to listen for local requests on port 3000.
app.listen(3000, function() {
	console.log('Server started and listening at localhost:3000');
});
