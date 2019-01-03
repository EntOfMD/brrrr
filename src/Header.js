import './SeasonDisplay.css';
import React from 'react';
import Clock from './Clock';

class Header extends React.Component {
	render() {
		return (
			<div className="ui menu">
				<a className="item active green" href="/">
					Home
				</a>
				<a className="item disabled" href="/">
					Lat:
				</a>
				<a className="item disabled" href="/">
					Long:
				</a>
				<div className="item disabled">
					<Clock />
				</div>
			</div>
		);
	}
}

export default Header;
