import {createSlice} from '@reduxjs/toolkit'

export const errorSlice = createSlice({
  name: 'errors',
  initialState: {
    errors: {}
  },
  reducers: {
    addErrors: (state, action) => {
      state.errors = action.payload;
    },
    eraseErrors: (state, action) => {
      state.errors = {};
    }
  }
});

export const {addErrors, eraseErrors} = errorSlice.actions;
export const selectErrors = state => state.errors;
export default errorSlice.reducer;