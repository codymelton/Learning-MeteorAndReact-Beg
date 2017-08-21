import React, { Component } from 'react' 
import { createContainer } from 'meteor/react-meteor-data'
import Item from './Item'
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';

import Items from '../api/Items'


// Defines function in a global sense - can call inside component just using headingClick().

// let headingClick = function(){
// 	console.log('hello')
// }

class App extends Component {

	addItems(event) {
		event.preventDefault() //Prevents all of the default functionality like page refresh on a form submit.
		const itemOne = this.refs.itemOne.value.trim()
		const itemTwo = this.refs.itemTwo.value.trim()
		if (itemOne !== '' && itemTwo !== '') {
			//	***The below is allowed with the Insecure package installed on development.  Once deleted need to move to
			//	a method on the server rather than the client.
			// Items.insert({ //This then add both items to the database collection using the refs below in the form.
			// 	itemOne: {
			// 		text: itemOne,
			// 		value: 0,
			// 	},
			// 	itemTwo: {
			// 		text: itemTwo,
			// 		value: 0,
			// 	}
			// })
			//  ***The next line in how we call Meteor methods.  See the method in Items.js
			Meteor.call('insertNewItem', itemOne, itemTwo, (err, res) => {
				if(!err) {
					this.refs.itemOne.value = '' //This callback verifies that the data is good to submit before clearing
					this.refs.itemTwo.value = '' //out all of the other form data.
				}
			})
		}
	}
	
	showAll() {
		if(this.props.showAll){
			Session.set('showAll', false)
		} else{
			Session.set('showAll', true) // You do not need to bind since you are creating a session var.  Only insert Session.set
		}
	}								 // Session takes two parameters ('nameOfVariable', value)



	render() {
		if (!this.props.ready) {
			return <div> Loading... </div> /* Anytime that you use return it cancels anything to follow in react land. */
		} 
		return (
			<div>
				<header>
					<h1>Non-rigged Voting</h1>
					<LoginButtons />
					<button onClick={this.showAll.bind(this)}> 
						Show {this.props.showAll ? 'One' : 'All'}
					</button>  {/* Will use to set a meteor session var */}
				</header>
				<main>
					<form className='new-items' onSubmit={this.addItems.bind(this)}>
						<input type='text' ref='itemOne' /> {/*ref gives us access to this.itemOne*/}
						<input type='text' ref='itemTwo' />
						<button type='submit'>Add Items</button>
					</form>
					{/*the following is the same as exporting [(<div></div>), ...]
					We are iterating over items and getting each individual item
					passing that into a voting item.  Props set item={item}
					Then it goes to Item.js and uses that to update.*/}
					{this.props.items.map((item) => {
						return <Item item={item} key={item._id} />
					})}
				</main>
			</div>
		)
		
	}
}

// Wrapper for the App component which will also grab the data itself 
// and then grab the data again when updated and push it in to the app.
// createContainer is a package in the react-meteor-data.
export default createContainer(() => {
	/*This next line subscribes to the data found in Items.js and allows access to it by client side.*/
	let itemsSub = Meteor.subscribe('allItems')
	let showAll = Session.get('showAll')  /* Grabs session variable with the name in ()'s */
	return {
		showAll,
		ready: itemsSub.ready(), /* Boolean to tell if the subscription is ready to grab.  It will remain false until fetched.*/
		/*Finds items in Items DB collection and fetch returns them as an array.*/
		items: Items.find({}, {
			limit: showAll ? 50 : 1, /* Tarenary opperator to then have the logic for the global variable. */
			sort: { lastUpdated: 1 } /* Can use 1 or -1 for sort.  If 1 Items with oldest will be displayed. */
		}).fetch()
	}
}, App)







class Heading extends Component {
	render() {
		return (
			<h1>{this.props.count} {/*accessing props from above in the prior component*/}</h1>
		)
	}
}