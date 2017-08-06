import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class LyricCreate extends Component{
	constructor(props){
		super(props)
		this.state = {
			content: ''
		}
	}
	handleLyricSubmit(event){
		event.preventDefault();
		this.props.mutate({
			variables:{
				songId: this.props.id,
				content: this.state.content
			}
		}).then(() => {
			this.setState({content: ''})
		})
	}
	render(){
		return(
			<form onSubmit={this.handleLyricSubmit.bind(this)}>
				<label>Add Lyric</label>
				<input
					value={this.state.content}
					onChange={event => this.setState({content: event.target.value})}/>
			</form>
		);
	}
};

const mutation = gql`
	mutation AddLyricToSong( $content: String, $songId: ID){
		addLyricToSong(songId: $songId, content: $content){
			id
			lyrics{
				id
				content
				likes
			}
		}
	}
`;

export default graphql(mutation)(LyricCreate);
