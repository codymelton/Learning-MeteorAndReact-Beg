//Because we did this in the /imports/api folder we will have access to this DB collection on the 
//client and the server side.

import { Mongo } from 'meteor/mongo'

const Items = new Mongo.Collection('items')

Meteor.methods({
	insertNewItem(itemOne, itemTwo){
		Items.insert({ //This then add both items to the database collection using the refs below in the form.
			itemOne: {
				text: itemOne,
				value: 0,
			},
			itemTwo: {
				text: itemTwo,
				value: 0,
			}
		})
	}
})


export default Items