import React from "react";
import useFormValidation from '../Auth/useFormValidation';
import validateCreateLink from '../Auth/validateCreateLink';

const INITIAL_STATE = {
  description: "",
  url: ""
}

function CreateLink(props) {
  const {handleChange, handleSubmit, handleBlur, isSumitting, values, errors} = 
    useFormValidation(INITIAL_STATE, validateCreateLink, submitLink) 
  const [firebaseError, setFirebaseError] = React.useState(null);

  async function submitLink() {
    const {description, url} = values;

    try {
      setFirebaseError(null);
      console.log(values);
      //props.history.push("/");
    }
    catch(err) {
      console.error('Submit Link Error', err);
      setFirebaseError(err.message);
    }
  }

  return (
    <form className="flex flex-column mt3" onSubmit={handleSubmit}>
      <input 
        name="description" 
        placeholder="A description for your link" 
        autoComplete="off" 
        type="text" 
        className = {errors.description && 'error-input'}
        value={values.description}
        onChange={handleChange} 
        onBlur={handleBlur}  />
      {errors.description && <p className="error-text">{errors.description}</p>}
      <input 
        name="url" 
        placeholder="A URL for your link" 
        autoComplete="off" 
        type="text" 
        className = {errors.url && 'error-input'}
        value={values.url}
        onChange={handleChange} 
        onBlur={handleBlur} />      
      {errors.url && <p className="error-text">{errors.url}</p>}
      {firebaseError && <p className="error-text">{firebaseError}</p>}
        <button type="submit" className="button pointer mr2" disabled={isSumitting} 
          style={{background: isSumitting ? "grey" : "orange"}}>
          Submit
        </button>
    </form>
  );
}

export default CreateLink;
