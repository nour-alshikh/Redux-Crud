import usePostDetails from '../hooks/use-post-details'
import Loading from '../components/Loading'
import { Form, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editPost } from '../state/slices/PostSlice';
import { useNavigate } from 'react-router-dom';
import WithGuard from '../util/WithGuard';
import { postSchemaValidation } from '../util/PostSchemaValidation';
import { useFormik } from 'formik';


function EditPost() {
    const { loading: loadingData, error: errorData, record } = usePostDetails();


    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            dispatch({ type: "posts/clearRecord" })
        }
    }, [dispatch])

    const formik = useFormik({
        initialValues: {
            title: record ? record?.title : "",
            description: record ? record?.description : "",
        },
        enableReinitialize: true,
        validationSchema: postSchemaValidation,
        onSubmit: (values) => {
            dispatch(editPost({ id: record.id, title: values.title, description: values.description })).unwrap().then(() => {
                navigate('/')
            })
        },
    });


    return (
        <>
            <Loading loading={loadingData} error={errorData}>
                <Form onSubmit={formik.handleSubmit}>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            name='title'
                            isInvalid={!!formik.errors.title} />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.title}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={formik.handleChange}
                            value={formik.values.description}
                            name='description'
                            isInvalid={!!formik.errors.description} />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.description}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Loading>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Loading>
                </Form>
            </Loading>
        </>
    )
}

export default WithGuard(EditPost)
