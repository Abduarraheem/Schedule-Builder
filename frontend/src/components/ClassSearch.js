import './ClassSearch.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useDispatch} from 'react-redux'
import {getClass, getClasses} from '../apis/classAPI.js' 
import {useReducer, useEffect} from 'react';

const initialState = {
	subject: "",
	crn: -1,
	courseNo: -1,
	title: "",
	credits: -1,
	instructor: "",
	timedate: [],
	seats: [],
	location: "",
	errors: {},
}

function reducer (state, action) {
	switch(action.type) {
		case "reset":
			return initialState;
		case "crn":
			return {...state, crn: action.payload}
		case "courseNo":
			return {...state, courseNo: action.payload}
		case "title":
			return {...state, title: action.payload}
		case "credits":
			return {...state, credits: action.payload}
		case "instructor":
			return {...state, instructor: action.payload}
		case "timedate":
			const tempTD = [...state.timedate];
			tempTD[action.index] = action.payload;
			return {...state, timedate: tempTD}
		case "seats":
			const tempSeats = [...state.seats];
			tempSeats[action.index] = action.payload;
			return {...state, seats: tempSeats}
	  case "location":
		return {...state, location: action.payload}
	  default:
		throw new Error("Error!");
	}
};
function ClassSearch(){
	const [state, dispatch] = useReducer(reducer, initialState);
	const {crn, courseNo, title, credits, instructor, timedate, seats, location} = state;
	const reduxDispatch = useDispatch()
	function searchData(e){
		console.log(e.target);
		console.log(e.target.value);
		dispatch({type: e.target.name, payload: e.target.value.trim()});
	}
	
	function searchBtn(e){
		e.preventDefault();
		const searchInfo = {        
			crn: crn,
			courseNo: courseNo,
			title: title,
			credits: credits,
			instructor: instructor,
			timedate: timedate,
			seats: seats,
			location: location};
		getClass(searchInfo);
	}
	
	function classesList(){
		const classes = getClasses(reduxDispatch);
		console.log(classes)
		return classes.map((c) => {
			return <option value={c.title}>c.title</option>;
		});
	}
	useEffect(() => {getClasses(reduxDispatch)}, []);
	return (
		<Form>
			{/* <Form.Group>
				<Form.Label>Subject: </Form.Label>
				<Form.Select value={title} name="title" onChange={searchData}>
					{classesList()}
				</Form.Select>
			</Form.Group> */}
			
			<Form.Group>
				<Form.Label>Course Number: </Form.Label>
				<Form.Select value={courseNo} name="courseNo" onChange={searchData}>
				</Form.Select>
			</Form.Group>

			<Button variant="primary" type="submit" onClick={searchBtn}>
				Search
			</Button>
		</Form>	
	);
}
export default ClassSearch;
