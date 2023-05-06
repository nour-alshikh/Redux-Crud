import * as Yup from 'yup';

export const postSchemaValidation = Yup.object().shape({
    title: Yup.string()
        .max(50, 'Must be 15 characters or less')
        .min(5, 'Must be 5 characters or less')
        .required('Required'),
    description: Yup.string()
        .max(50, 'Must be 15 characters or less')
        .min(5, 'Must be 5 characters or less')
        .required('Required'),
})
