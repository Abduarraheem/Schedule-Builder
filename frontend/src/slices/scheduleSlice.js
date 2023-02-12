import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialSchedules = localStorage.getItem('allSchedules') ? JSON.parse(localStorage.getItem('allSchedules')) : {};

export const scheduleSlice = createSlice({
	name: 'slice',
	initialState: {
		allSchedules: initialSchedules,
		formSubmitted: false,
	  },
	  reducers: {
		setAllSchedules: (state, action) => {
			state.AllSchedules = action.payload;
		},
		clearAllSchedules: (state) => {
			state.AllSchedules = initialSchedules;
		}
	  }
});

export const {setAllSchedules, clearAllSchedules} = scheduleSlice.actions;
export default scheduleSlice.reducer;