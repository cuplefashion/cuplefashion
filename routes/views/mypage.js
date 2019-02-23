var keystone = require('keystone');
const firebase = require('firebase');
var Customer = keystone.list('Customer');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // TODO (byul) : write my page

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'mypage';

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



    view.render('mypage', { layout: 'main' })
};
