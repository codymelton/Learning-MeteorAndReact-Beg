//Because we did this in the /imports/api folder we will have access to this DB collection on the 
//client and the server side.

import { Mongo } from 'meteor/mongo'

const Items = new Mongo.Collection('items')

export default Items