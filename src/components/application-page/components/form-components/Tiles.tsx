import React from 'react';
import Tile from '../form-components/Tile';

const Tiles = ({tiles, onClick}:any) => {
	return (
		<div>
			<div className="title">
				Wybierz profil klasy
			</div>
			<div className="tiles">
				{tiles.map((t:any, index:number) => 
					<Tile key={t.name} {...t} clickHandler={() => onClick(t.name, index)}/>)}
			</div>
		</div>
	);
}
export default Tiles;