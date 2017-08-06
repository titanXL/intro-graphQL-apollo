import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class LyricList extends Component{

	handleLyricLike(id, likes) {
		this.props.mutate({
			variables: {id},
			optimisticResponse: {
				__typename: 'Mutation',
				likeLyric: {
					id,
					__typename: 'LyricType',
					likes: likes + 1 
				}
			}
		})
	}

	render(){
		return(
			<ul className='collection'>
				{this.props.lyrics.map(({id, content, likes}) =>{
					return <li key={id} className='collection-item'>{content}
					<i
						className='material-icons tiny right'
						onClick={() => this.handleLyricLike(id, likes)}
						>
						thumb_up
					</i>
					<span className='right'>{likes}</span>
					</li>
				})}
			</ul>
		);
	}
}

const mutation = gql`
	mutation LikeLyric($id: ID){
		likeLyric(id: $id){
			id
			likes
		}
	}
`;

export default graphql(mutation)(LyricList);
