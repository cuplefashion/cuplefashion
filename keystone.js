// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');
var firebase = require('firebase');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'cuplefashion',
	'brand': 'cuplefashion',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': '.hbs',

	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs',
	}).engine,

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	users: 'users',
	enquiries: 'enquiries',
	images: 'images',
	products: 'products',
	siteinfos: 'site-infos'
});

// Start Keystone to connect to your database and initialise the web server


//need to initialise firebase in keystone.js for using them in routes files.
var config = {
	// Deokgwan's Firebase
	/*
	apiKey: "AIzaSyCUWwhrBJeN7rDTUAZ0G2N8dDftJK47Zbo",
	authDomain: "login-63897.firebaseapp.com",
	databaseURL: "https://login-63897.firebaseio.com",
	projectId: "login-63897",
	storageBucket: "login-63897.appspot.com",
	messagingSenderId: "986984805875"
	*/
	// Minjun's Firebase
	apiKey: "AIzaSyBCa0Xz5w_yVHJSAeDPIerXH6ivfgt-RPg",
	authDomain: "cuplefashion-c41cf.firebaseapp.com",
	databaseURL: "https://cuplefashion-c41cf.firebaseio.com",
	projectId: "cuplefashion-c41cf",
	storageBucket: "cuplefashion-c41cf.appspot.com",
	messagingSenderId: "646752289112",
};

firebase.initializeApp(config);

keystone.start();
