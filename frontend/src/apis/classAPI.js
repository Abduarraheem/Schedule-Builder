import axios from 'axios'
import { setAllClasses } from '../slices/classSlice';

export const getClasses = classRepo => dispatch => {
	return axios
	.get('/api/classrepo/')
	.then(res => {
		dispatch(setAllClasses(res.data));
		return res.data;
	})
	.catch(err => {
		console.log(err.response.data);
		//dispatch(addError(err.response.data));
	})
}
export const getClass = classRepo => dispatch => {
	return axios
	.get('/api/classrepo/getclass/', classRepo)
	.then(res => {
		return res.data;
	})
	.catch(err => {
		console.log(err.response.data);
		//dispatch(addError(err.response.data));
	})
}
