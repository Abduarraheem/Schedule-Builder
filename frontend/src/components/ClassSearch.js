import { useState, useReducer, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {getClass, getClasses, getSubjects } from '../apis/classAPI.js' 
import './ClassSearch.css';

const initialState = {
	subject: "",
	crn: "",
	courseNo: "",
	title: "",
	credits: "",
	instructor: "",
	timedate: "",
	seats: "",
	location: "",
	errors: "",
}

function reducer (state, action) {
	switch(action.type) {
		case "reset":
			return initialState;
		case "subject":
			return { ...state, subject: action.payload }
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
			return { ...state, seats: action.payload }
	  case "location":
		return {...state, location: action.payload}
	  default:
		throw new Error("Error!");
	}
};
const ClassSearch = () => {
	const [show, setShow] = useState(false);
	const [state, dispatch] = useReducer(reducer, initialState);
	const {subject, crn, courseNo, title, credits, instructor, timedate, seats, location} = state;
	const reduxDispatch = useDispatch()

	const searchData = (e) => {
		dispatch({type: e.target.name, payload: e.target.value.trim()});
	}
	
	const searchBtn = (e) => {
		e.preventDefault();

		if (Object.values(state).every(x => x === "" || x === '')) {
			handleShow()
		}
		const searchInfo = {
			subject: subject,        
			crn: crn,
			courseNo: courseNo,
			title: title,
			credits: credits,
			instructor: instructor,
			timedate: timedate,
			seats: seats,
			location: location};

		console.log(searchInfo)

		const classes = getClass(searchInfo)(reduxDispatch);
		console.log(classes)
	}
	
	const subjectList = () => {
		const classes = getSubjects()(reduxDispatch);

		return classes.map((c) => {
			return <option value={c.department}>{c.department}</option>;
		});
	}

	const handleShow = () => {
		setShow(!show);
	}

	useEffect(() => {getSubjects()(reduxDispatch)}, []);

	return (
		<div>
			<Form>
				{/* <Form.Group>
					<Form.Label>Subject: </Form.Label>
					<Form.Select value={title} name="title" onChange={searchData}>
						{classesList()}
					</Form.Select>
				</Form.Group> */}
				<Form.Group>
					<Form.Label>Department: </Form.Label>
					<Form.Select value={subject} name="subject" onChange={searchData}>
						{/* {subjectList()} */}
					</Form.Select>
				</Form.Group>
				<Form.Group>
					<Form.Label>CRN: </Form.Label>
					<Form.Control value={crn} name="crn" onChange={searchData}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Course Number: </Form.Label>
					<Form.Control value={courseNo} name="courseNo" onChange={searchData}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Course Title: </Form.Label>
					<Form.Control value={title} name="title" onChange={searchData}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Credits: </Form.Label>
					<Form.Control value={credits} name="credits" onChange={searchData}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Instructor: </Form.Label>
					<Form.Control value={instructor} name="instructor" onChange={searchData}/>
				</Form.Group>
				{/* <Form.Group>
					<Form.Label>Time and Date: </Form.Label>
					<Form.Select value={timedate} name="courseNo" onChange={searchData}>
					</Form.Select>
				</Form.Group> */}
				<Form.Group>
					<Form.Label>Open Seats Only: </Form.Label>
					<Form.Check value={seats} name="seats" onChange={searchData}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Location: </Form.Label>
					<Form.Select value={location} name="location" onChange={searchData}>
					</Form.Select>
				</Form.Group>

				<Button variant="primary" type="submit" onClick={searchBtn}>
					Search
				</Button>
			</Form>
			<Modal show={show} onHide={handleShow}>
				<Modal.Header closeButton>
				<Modal.Title>Warning</Modal.Title>
				</Modal.Header>
				<Modal.Body>You haven't input anything in the search</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleShow}>
					Close
				</Button>
					<Button variant="primary" onClick={handleShow}>
					Proceed Anyways
				</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
export default ClassSearch;
