var keystone = require('keystone');
const firebase = require('firebase');
exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // TODO (byul) : write my page

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'mypage';

    view.render('mypage', { layout: 'main' })
};
