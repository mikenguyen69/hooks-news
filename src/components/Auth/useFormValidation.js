import React from "react";

function useFormValidation(initialState) {
    const [values, setValues] = React.useState(initialState);

    function handleChange(event) {
        setValues(previousValues => ({
            ...previousValues,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log({values});
    }

    return { handleChange, handleSubmit, values };
}

export default useFormValidation;
