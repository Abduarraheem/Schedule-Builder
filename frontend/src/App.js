import './App.css';
import React, { Suspense } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Loader from './components/Loader'
// import ScheduleBuilder from './components/ScheduleBuilder';
import RenderErrBoundary from './RenderErrBoundary'
import ClassSearch from './components/ClassSearch.js';
//import 'bootstrap/dist/css/bootstrap.min.css'

class App extends React.Component {
  componentDidMount() {
    this.props.hideLoader();
  }

  render() {
    return (
      <BrowserRouter>
        <RenderErrBoundary>
          <Suspense fallback={<Loader size="big" />}>
            <Routes>
              <Route exact path="/" name="Landing Page" element={<ClassSearch/>}/>
              
            </Routes>
          </Suspense>
        </RenderErrBoundary>
      </BrowserRouter>
    );
  }
}

export default App;
