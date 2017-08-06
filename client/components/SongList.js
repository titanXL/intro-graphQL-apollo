import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {Link} from 'react-router';
import Song from './Song';
import {query} from '../queries/fetchSongs';

class SongList extends Component {

	handleSongDelete(id) {
		this.props.deleteSong({
			variables: {id}
		})
		.then(() => this.props.data.refetch());
	}

	renderSongs(){
		return this.props.data.songs.map(({title, id}) => {
			return (
				<div key={id} className="collection-item">
					<Song key={id} title={title} id={id}>
						<i className='material-icons tiny right' onClick={() => this.handleSongDelete(id)}>delete</i>
					</Song>
				</div>
			);
		});
	}

	render(){
		if (this.props.data.loading) {
			return (
				<div>LOADING...</div>
			);
		}
		return (
			<div>
				<ul className="collection">
					{this.renderSongs()}
				</ul>
				<Link to='/songs/new' className='btn-floating btn-large red right'><i className='material-icons'>add</i></Link>
			</div>
		);
	}
};

const mutation = gql`
	mutation DeleteSong($id: ID){
		deleteSong(id: $id){
			id
		}
	}
`;

export default compose(
	graphql(query),
	graphql(mutation, { name: 'deleteSong'})
)(SongList);
