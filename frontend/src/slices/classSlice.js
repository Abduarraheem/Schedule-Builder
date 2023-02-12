import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialClasses = localStorage.getItem('allClasses') ? JSON.parse(localStorage.getItem('allClasses')) : {};

export const Classeslice = createSlice({
	name: 'slice',
	initialState: {
		allClasses: initialClasses,
		formSubmitted: false,
	  },
	  reducers: {
		setAllClasses: (state, action) => {
			state.AllClasses = action.payload;
		},
		clearAllClasses: (state) => {
			state.AllClasses = initialClasses;
		}
	  }
});

export const {setAllClasses, clearAllClasses} = Classeslice.actions;
export default Classeslice.reducer;