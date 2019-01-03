//imports from node_modules
import React from 'react';
import ReactDOM from 'react-dom';

//imports from local folder
import SeasonDisplay from './SeasonDisplay';
import Header from './Header';
import Spinner from './Spinner';

// main app
class App extends React.Component {
	/* this is the using constructor way
	 //Class is more versitile than function components. We're basically borrowing React.Component's library
	constructor(props) {
		// By using constructor, you override React.Component's constructor.
		super(props);
		//super let's you use React.Component's functions. setState is a function from React.Component, so we can't use it w/o super.

		this.state = { lat: null, long: null, errorMessage: '' };
		//THIS IS THE ONLY ACCEPTIONAL TIME TO DIRECT ASSIGN. USE this.setState INSTEAD.
	}
 */

	state = { lat: null, long: null, errorMessage: '' };
	//This is 100% equilivent to the one above

	componentDidMount() {
		//only runs once, mwhen(HAHAHA OUR CAT JUST WALKED ON THE KEYBOARD AND ADDED A 'M') the DOM gets rendered for the first time
		window.navigator.geolocation.getCurrentPosition(
			//returns TWO callback functions: success(position) and error.
			(position) => this.setState({ lat: position.coords.latitude, long: position.coords.longitude }),
			(err) => {
				this.setState({
					errorMessage: err.message,
					code: err.code,
				});
			}
		);
	}
	renderContent() {
		//helper function
		if (this.state.errorMessage && !this.state.lat) {
			return (
				<div>
					<Header />
					<h3 className="">
						{' '}
						<div className="ui red horizontal label">Error</div>
						<br />
						{this.state.errorMessage} <br /> Error Code: {this.state.code}
						<br />
						Hint: Make sure to give access to location!
					</h3>
				</div>
			);
		}
		if (!this.state.errorMessage && this.state.lat) {
			return (
				<div>
					<Header />
					<SeasonDisplay lat={this.state.lat} long={this.state.long} />
				</div>
			);
		}

		return <Spinner message="Loading... Please accept location request" />;
	}

	render() {
		//NEVER PUT REQUESTS INTO RENDER, UNLESS YOU WANT TO REQUEST EVERYTIME RENDER IS CALLED, WHICH IS EVERY STATE CHANGE-by default
		return <div className="border arrow">{this.renderContent()}</div>;
	}
}

ReactDOM.render(<App />, document.querySelector('#root'));
//Finds id#root in html file and insert App component into where ever it is
