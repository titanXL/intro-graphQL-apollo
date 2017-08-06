import React from 'react';
import {Link} from 'react-router';

const Song = ({id, title, children}) => {
	return (

			<li>
				<Link to={`/songs/${id}`}>
					{title}
				</Link>
				{children}
			</li>

	)
}

export default Song;
