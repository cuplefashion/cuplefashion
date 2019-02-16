var keystone = require('keystone');
var SiteInfo = keystone.list('SiteInfo');
var firebase = require('firebase');
var customer = keystone.list('Customer');

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
			console.log("[routes/main.js] Welcome customer! you're currently logged in");
			locals.user = user
			const uuid = user.uid

			customer.model.find({ uid: uuid }).exec(function (err, data) {
				if (err) {
					console.log(err);
					res.status(500).send('DB Error');
					next();
				}
				locals.customer = data;
				console.log(data);
				next();
			});

			/* const docRef = db.collection('users').doc(uid)
			docRef.get().then(doc => {
				if (doc.exists) {
					locals.displayName = doc.data()
					console.log(doc.data())
					next()
				} else {
					console.log("No such document!")
					next()
				}
			}).catch(err => {
				console.log("Error getting document", err)
				next(err)
			}) */
		} else {
			console.log("[routes/main.js] You're not logged in");
			next()
		}

		// firebase.auth().onAuthStateChanged(function (user) {
		//   if (user) {
		//     console.log("[routes/main.js] Welcome customer! you're currently logged in");
		//     locals.user = user
		//     const uid = user.uid
		//     const docRef = db.collection('users').doc(uid)
		//     docRef.get().then(doc => {
		//       if (doc.exists) {
		//         locals.displayName = doc.data()
		//         console.log(doc.data())
		//         console.log('3')
		//         next()
		//       } else {
		//         console.log("No such document!")
		//         next()
		//       }
		//     }).catch(err => {
		//       console.log("Error getting document", err)
		//       next(err)
		//     })
		//   } else {
		//     console.log("[routes/main.js] You're not logged in");
		//     next()
		//   }
		// });
	})


	// Render the view
	view.render('main', { layout: 'main' });
};
