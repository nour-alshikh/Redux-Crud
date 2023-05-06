import {
    Button,
    ButtonGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function PostListItem({ data, deleteRecord, isLoggedIn }) {
    const navigate = useNavigate();

    const deleteHandler = (item) => {
        if (window.confirm(`Are you sure you want to delete this record -${item.title}-`)) {
            deleteRecord(item.id)
        }
    }

    const records = data.map((post, i) => {
        return (
            <tr key={i}>
                <td>{++i}</td>
                <td><Link to={`post/${post.id}`}>{post.title}</Link></td>
                <td>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="success" onClick={() => navigate(`post/${post.id}/edit`)}>Edit</Button>
                        <Button variant="danger" onClick={() => deleteHandler(post)} disabled={!isLoggedIn}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        )
    })

    return (
        <>
            {records}
        </>
    )
}

export default PostListItem;
