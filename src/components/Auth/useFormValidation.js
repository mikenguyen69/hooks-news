import React from "react";

function useFormValidation(initialState, validate) {
    const [values, setValues] = React.useState(initialState);
    const [errors, setErrors] = React.useState({});
    const [isSumitting, setSubmitting] = React.useState(false);

    React.useState(() => {
        if (isSumitting) {
            const noErrors = Object.keys(errors).length === 0;
            if (noErrors) {
                console.log('authenticated', values)
            }
            else {
                setSubmitting(false)
            }
        }
    }, [errors]);

    function handleChange(event) {
        event.persist();

        setValues(previousValues => ({
            ...previousValues,
            [event.target.name]: event.target.value
        }));
    }

    function handleBlur() {
        const validationErrors = validate(values);
        setErrors(validationErrors);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        console.log({values});
    }

    return { handleChange, handleSubmit, handleBlur, errors, isSumitting, values };
}

export default useFormValidation;
