import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import scheduleSlice from '../slices/scheduleSlice'
import classSlice from '../slices/classSlice'
import errorSlice from '../slices/errorSlice'
export default configureStore({
  reducer: {
    schedule: scheduleSlice,
    class: classSlice,
    errors: errorSlice,
  },
  middleware: [thunk, logger]
})