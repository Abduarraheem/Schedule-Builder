import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Calendar from "../components/Calendar"
import ClassSearch from "../components/ClassSearch"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import SearchResult from "../components/SearchResult"

const ScheduleBuilder = () => {
    const [show, setShow] = useState(false);
    const results = useSelector(state => state.class.search);
    const errors = useSelector(state => state.errors.errors);

    const handleShow = () => {
        setShow(!show);
    }

    useEffect(() => {}, [results]);

    useEffect(() => {
        if ("classNotFound" in errors) {
            handleShow()
        }
    }, [errors]);

    if (Object.keys(results).length !== 0) {
        return (
            <Container>
                <Row>
                    <Col>
                        <Calendar></Calendar>
                    </Col>
                    <Col>
                        <SearchResult results={results}></SearchResult>
                    </Col>
                </Row>
            </Container>
        );
    }
    else {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Calendar></Calendar>
                        </Col>
                        <Col>
                            <ClassSearch></ClassSearch>
                        </Col>
                    </Row>
                </Container>
                <Modal show={show} onHide={handleShow}>
					<Modal.Header closeButton>
						<Modal.Title>Warning</Modal.Title>
					</Modal.Header>
					<Modal.Body>No class with search criteria was found</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleShow}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
            </div>
        );
    }
    
};

export default ScheduleBuilder;