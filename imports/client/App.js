import React, { Component } from 'react' 
import { createContainer } from 'meteor/react-meteor-data'
import Item from './Item'

import Items from '../api/Items'


// Defines function in a global sense - can call inside component just using headingClick().

// let headingClick = function(){
// 	console.log('hello')
// }

class App extends Component {
	render() {
		return (
			<div>
				<header>
					<h1>Non-rigged Voting</h1>
				</header>
				<main>
					{/*the following is the same as exporting [(<div></div>), ...]
					We are iterating over items and getting each individual item
					passing that into a voting item.  Props set item={item}
					Then it goes to Item.js and uses that to update.*/}
					{this.props.items.map((item) => {
						return <Item item={item} />
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
	return {
		/*Finds items in Items DB collection and fetch returns them as an array.*/
		items: Items.find({}).fetch()
	}
}, App)







class Heading extends Component {
	render() {
		return (
			<h1>{this.props.count} {/*accessing props from above in the prior component*/}</h1>
		)
	}
}