import axios from 'axios'
import { addErrors } from '../slices/errorSlice';

export const getSchedules = schedule => dispatch => {
	return axios
	.post('/api/schedules/')
	.then(res => {
		return res.data;
	})
	.catch(err => {
		console.log(err.response.data);
		dispatch(addErrors(err.response.data));
	})
}
export const getSchedule = schedule => dispatch => {
	return axios
	.post('/api/schedules/'+ schedule.title, schedule)
	.then(res => {
		return res.data;
	})
	.catch(err => {
		console.log(err.response.data);
		dispatch(addErrors(err.response.data));
	})
}

export const addSchedule = schedule => dispatch => {
	return axios
	.post('/api/schedules/add', schedule)
	.then(res => {
		return res.data;
	})
	.catch(err => {
		console.log(err.response.data);
		dispatch(addErrors(err.response.data));
	})
}

export const updateSchedule = schedule => dispatch => {
	return axios
	.post('/api/schedules/update'+schedule.title, schedule)
	.then(res => {
		return res.data;
	})
	.catch(err => {
		console.log(err.response.data);
		dispatch(addErrors(err.response.data));
	})
}