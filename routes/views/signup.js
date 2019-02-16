var keystone = require('keystone');
var firebase = require('firebase');
const Customer = keystone.list('Customer')

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'signup';

	view.on('post', function (next) {
		console.log('[routes/login.js] Signup post function executed')
		const newUser = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.emailAddress,
			password1: req.body.password,
			password2: req.body.password_re,
		}

		// firebase auth method referred from - 
		// https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithEmailAndPassword
		if (newUser.password1 === newUser.password2) {
			firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password1)
				.then((user) => {
					const uid = user.user.uid
					const name = newUser.firstName + " " + newUser.lastName
					Customer.model.create({
						uid: uid,
						name: {
							first: newUser.firstName,
							last: newUser.lastName
						},
						email: newUser.email,
					}).then(() => {
						next()
					}).catch(err => {
						console.log("Error while creating customer database after Firebase user is successfully added")
						next(err)
					})
				}).catch((error) => {
					console.log(error.message)
					req.flash('warning', error.message) // send message to client
					next()
				})
		} else {
			const errMsg = "Password doesn't match each other"
			console.log(errMsg)
			req.flash('warning', errMsg)
			next()
		}
	});

	// Render the view
	view.render('signup', { layout: 'main' });

};
