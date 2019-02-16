var keystone = require('keystone');
var SiteInfo = keystone.list('SiteInfo');
var firebase = require('firebase');
var Customer = keystone.list('Customer');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	view.on('init', function (next) {
		var q = SiteInfo.model.find({}).populate('mainImage');

		q.exec(function (err, result) {
			locals.siteinfo = result;
			next(err)
		});
	});

	view.on('init', function (next) {
		const user = firebase.auth().currentUser
		if (user) {
			console.log("[routes/main.js] Welcome Customer! you're currently logged in");
			locals.user = user
			const uuid = user.uid

			Customer.model.findOne({ uid: uuid }).exec(function (err, data) {
				if (err) {
					console.log(err);
					res.status(500).send('DB Error');
					next();
				}
				locals.customer = data;
				console.log(data);
				next();
			});

		} else {
			console.log("[routes/main.js] You're not logged in");
			next()
		}
	})


	// Render the view
	view.render('main', { layout: 'main' });
};
