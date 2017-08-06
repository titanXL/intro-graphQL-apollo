import gql from 'graphql-tag';

export const query = gql`
	query SongDetail($id: ID!){
		song(id: $id){
			id
			title
			lyrics{
				id
				content
				likes
			}
		}
	}
`;
