import React from 'react';
import Tile from '../form-components/Tile';

export default class Tiles extends React.Component<any, any> {
	constructor(props:any) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(option:string, index:number) {
		this.props.onClick(option, index);
		let tilesCopy = this.props.tiles.slice();

		tilesCopy.forEach((t:any, i:number) => {
			t.selected = (i === index);
		});


		// this.setState({
		//   tiles: tilesCopy
		// });
	}

	render() {
		return (
			<div>
				<div className="title">
					Wybierz profil klasy
				</div>
				<div className="tiles">
					{this.props.tiles.map((t:any, index:number) => <Tile key={t.name} {...t} clickHandler={() => this.handleClick(t.name, index)}/>)}
				</div>
			</div>
		);
	}
}