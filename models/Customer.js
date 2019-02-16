var keystone = require('keystone');
var firebase = require('firebase');
var Types = keystone.Field.Types;

/**
 Issue : Error occurred when you try to add customer info in admin page.

 FIXED (minjun)
 
 cause : when adding customer from admin page, 
	it creates customer with name and email but without uid becuase uid is from firebase.
	so uid is null at this point
	and when adding another customer, this second customer's uid is also null
	and now we have two documents which has the same uid value (null)
	this is not allowed because uid is the first value
	(I don't quite understand but it looks like the first element is automatically assigned as key element)
 
 resolution :	Added middleware which executed right after the customer is created
	on mongodb. What this middleware does is to create firebase user based on
	the info admin has just entered and get uid from firebase > update customer in mongodb
							
 */
var Customer = new keystone.List('Customer');

Customer.add({
	uid: { type: Types.Text },
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, initial: true, required: true, unique: true },
	phoneNumber: { type: Types.Text },
	address: {
		address1: { type: Types.Text },
		address2: { type: Types.Text },
		city: { type: Types.Text },
		state: { type: Types.Text },
		zipcode: { type: Types.Number },
	}
});

Customer.defaultColumns = "name, email"

// when admin adds customer manually from admin page, 
// this middleware adds customer from Firebase as well
Customer.schema.post('save', (doc, next) => {
	if (!doc.uid) {
		console.log("New customer is added from admin page - adding from Firebase too")
		firebase.auth().createUserWithEmailAndPassword(doc.email, "test123")
			.then((user) => {
				const uid = user.user.uid
				Customer.model.updateOne(
					{ _id: doc._id },
					{ $set: { uid: uid } }
				).then(() => next())
			}).catch((error) => {
				console.log(error.message)
				next(error)
			})
	} else {
		next()
	}
})

Customer.register();
