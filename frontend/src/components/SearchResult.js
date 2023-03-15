import Table from "react-bootstrap/Table"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const SearchResult = ({results}) => {

    const generateRows = () => {
        results.map(item => {
            return (
                <tr>
                    <td>{item.crn}</td>
                    <td>{item.subject}</td>
                    <td>{item.courseNo}</td>
                    <td>{item.title}</td>
                    <td>{item.credits}</td>
                    <td>{item.instructor}</td>
                    <td>{item.seats[0]}</td>
                    <td>{item.seats[1]}</td>
                    <td>{item.timedate}</td>
                    <td>{item.location}</td>
                </tr>
            );
        });
    };

    return (
        <div>
            <Table>
                <th>
                    <td>CRN</td>
                    <td>Dept</td>
                    <td>Course #</td>
                    <td>Title</td>
                    <td>Credits</td>
                    <td>Instructor</td>
                    <td>Seats Taken</td>
                    <td>Seats Total</td>
                    <td>Time and Date</td>
                    <td>Location</td>
                </th>
                {generateRows()}
            </Table>
        </div>
    );
};

export default SearchResult;