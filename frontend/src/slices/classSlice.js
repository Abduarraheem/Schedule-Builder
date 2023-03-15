import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialSubjects = localStorage.getItem('allSubjects') ? JSON.parse(localStorage.getItem('allSubjects')) : {};
const initialClasses = localStorage.getItem('allClasses') ? JSON.parse(localStorage.getItem('allClasses')) : {};
const initialSearch = localStorage.getItem('search') ? JSON.parse(localStorage.getItem('search')) : {};

export const Classeslice = createSlice({
	name: 'slice',
	initialState: {
		allSubjects: initialSubjects,
		allClasses: initialClasses,
		search: initialSearch,
		formSubmitted: false,
	  },
	  reducers: {
		setAllSubjects: (state, action) => {
			  state.allSubjects = action.payload;
		},
		clearAllSubjects: (state) => {
			state.allSubjects = initialSubjects;
		},
		setAllClasses: (state, action) => {
			state.allClasses = action.payload;
		},
		clearAllClasses: (state) => {
			state.allClasses = initialClasses;
		},
		setResults: (state, action) => {
			state.search = action.payload;
		}
	  }
});

export const { setAllSubjects, clearAllSubjects, setAllClasses, clearAllClasses, setResults } = Classeslice.actions;
export default Classeslice.reducer;