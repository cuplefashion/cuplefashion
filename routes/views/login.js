var keystone = require('keystone');
var firebase = require('firebase');
var customer = keystone.list('Customer');

exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'login';

  view.on('post', function (next) {
    const email = req.body.inputEmail;
    const password = req.body.inputPassword;

    // firebase auth method referred from - 
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithEmailAndPassword
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function (user) {
        const uuid = user.user.uid
        console.log("User UID : " + uuid)
        console.log('[routes/login.js] Login post function executed')

        /*
        difference between findOne() and find():
        findOne - if query matches, first document is returned, otherwise null.
        find - no matter how many number of documents matched, a cursor is returned, never null.
        */
        customer.model.findOne({ uid: uuid }).exec(function (err, customer) {
          if (err) {
            console.log(err);
            res.status(500).send('DB Error');
            next();
          }
          if (!customer) {
            console.log(" Couldn't find matching user");
            res.status(500).send('NO customer uid matched with firebase in database');
            next();
          }
          else {
            locals.customer = customer;

            console.log("[routes/login.js] logged in and retreived user info successfully")
            console.log("[routes/login.js] Customer Information:" + customer);
            res.redirect('/')
          }

        });

      }).catch(function (error) {
        console.log(error.message)
        req.flash('warning', error.message) // send message to client
        next()
      })

  });

  view.render('login', { layout: 'main' });
};
