import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { insertPost } from '../state/slices/PostSlice';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import Loading from '../components/Loading'
import WithGuard from '../util/WithGuard';
import { postSchemaValidation } from '../util/PostSchemaValidation';

function AddPost() {

    const { loading, error } = useSelector(state => state.posts);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema: postSchemaValidation,
        onSubmit: (values) => {
            const id = Math.floor(Math.random() * 500)
            dispatch(insertPost({ id, title: values.title, description: values.description }))
                .unwrap()
                .then(() => {
                    navigate('/')
                }).catch(() => {
                    console.log("saxsaxasasx");
                })
        },
    });

    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        name='title'
                        isInvalid={!!formik.errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.title}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        name='description'
                        isInvalid={!!formik.errors.description} />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.description}
                    </Form.Control.Feedback>
                </Form.Group>
                <Loading loading={loading} error={error}>
                    <Button variant="primary" type="submit">Submit</Button>
                </Loading>
            </Form>
        </>
    )
}

export default WithGuard(AddPost)
