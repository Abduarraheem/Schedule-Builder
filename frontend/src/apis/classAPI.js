import axios from 'axios'
import { setAllClasses, setAllSubjects } from '../slices/classSlice';
import { addErrors } from '../slices/errorSlice';

export const getClasses = classRepo => dispatch => {
	return axios
	.get('/api/classrepo/')
	.then(res => {
		dispatch(setAllClasses(res.data));
		return res.data;
	})
	.catch(err => {
		console.log(err.response.data);
		dispatch(addErrors(err.response.data));
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
		dispatch(addErrors(err.response.data));
	})
}
export const getSubjects = classRepo => dispatch => {
	return axios
	.get('/api/subjects/')
	.then(res => {
		dispatch(setAllSubjects(res.data));
		return res.data;
	})
	.catch(err => {
		console.log(err.response.data);
		dispatch(addErrors(err.response.data));
	})
}
