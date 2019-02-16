var keystone = require('keystone');
var Types = keystone.Field.Types;

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
Customer.register();
