const keystone = require('keystone')
const firebase = require('firebase')

exports = module.exports = (req, res) => {
  const view = new keystone.View(req, res)
  const locals = res.locals
  const productSlug = req.params.productSlug

  view.query('product', keystone.list('Product')
    .model.findOne({ slug: productSlug })
    .populate('images'))

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) locals.customer = user
  });

  // Load products
  view.render('product', { layout: 'main' })
}
