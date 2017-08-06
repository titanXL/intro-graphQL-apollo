import React from 'react';
import {query} from '../queries/fetchSong';
import {graphql} from 'react-apollo';
import {Link} from 'react-router';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

const SongDetail = props => {
	const {song} = props.data;
	if (!song) {
		return <h3>Loading...</h3>
	}
	return (
		<div>
			<Link to ='/' className='btn'>Back</Link>
			<h3>{song.title}</h3>
			<LyricList lyrics={song.lyrics}/>
			<LyricCreate id={props.params.id}/>
		</div>
	);
};

export default graphql(query,{
	options: (props) => ({variables: {id: props.params.id}})
})(SongDetail);
