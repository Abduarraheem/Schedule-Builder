import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialSubjects = localStorage.getItem('allSubjects') ? JSON.parse(localStorage.getItem('allSubjects')) : {};
const initialClasses = localStorage.getItem('allClasses') ? JSON.parse(localStorage.getItem('allClasses')) : {};

export const Classeslice = createSlice({
	name: 'slice',
	initialState: {
		allSubjects: initialSubjects,
		allClasses: initialClasses,
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
		}
	  }
});

export const { setAllSubjects, clearAllSubjects, setAllClasses, clearAllClasses} = Classeslice.actions;
export default Classeslice.reducer;