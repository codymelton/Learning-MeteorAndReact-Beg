//Because we did this in the /imports/api folder we will have access to this DB collection on the 
//client and the server side.

import { Mongo } from 'meteor/mongo'

const Items = new Mongo.Collection('items')

if (Meteor.isServer) {  // Ensures that this is happening on the server side after removing AutoPublish from packages.
	Meteor.publish('allItems', function() {
		return Items.find({}, {
			limit: 1,
			sort: { lastUpdated: 1 }
		}) //  This has the database tell you what data is available to the client.  Need to then subscribe to the data in App.js
	})     //  Make sure and limit and sort in both places to keep things running smoothly.  Limits collections on backend to 1 item.




	Meteor.methods({
		insertNewItem(itemOne, itemTwo){
			check(itemOne, String)
			check(itemTwo, String)  //use this or a package like simple schema to improve security in production apps
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
		},

		voteOnItem(item, position) {
			check(item, Object)
			let lastUpdated = new Date()
			if(Meteor.userId()) {
				if (position === 'itemOne'){
					Items.update(item._id, {
						$inc: {
							'itemOne.value': 1
						},
						$set: {
							lastUpdated
						}
					})
				} else {
					Items.update(item._id, {
						$inc: {
							'itemTwo.value': 1
						},
						$set: {
							lastUpdated
						}
					})
				}
			}
		}

	})
}

export default Items