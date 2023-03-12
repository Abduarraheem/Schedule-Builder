import Calendar from "../components/Calendar"
import ClassSearch from "../components/ClassSearch"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const ScheduleBuilder = () => {
    return (
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
    );
};

export default ScheduleBuilder;