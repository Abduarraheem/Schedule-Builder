import axios from 'axios'

export const getClasses = classRepo => dispatch => {
	return axios.
	post('/api/classrepo/')
	.then(res => {
		return res.data;
	})
	.catch(err => {
		console.log(err.response.data);
		// dispatch(addError(err.response.data));
	})
}
export const getClass = classRepo => dispatch => {
	return axios.
	post('/api/classrepo/'+ classRepo.category, classRepo)
	.then(res => {
		return res.data;
	})
	.catch(err => {
		console.log(err.response.data);
		// dispatch(addError(err.response.data));
	})
}
