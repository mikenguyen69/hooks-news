import React from "react";
import useFormValidation from "../Auth/useFormValidation";
import validateCreateLink from "../Auth/validateCreateLink";
import FirebaseContext from "../../firebase/context";

const INITIAL_STATE = {
  description: "",
  url: ""
}

function CreateLink(props) {
  const {firebase, user} = React.useContext(FirebaseContext); 
  const {handleChange, handleSubmit, handleBlur, isSumitting, values, errors} = 
    useFormValidation(INITIAL_STATE, validateCreateLink, submitLink) 
  const [firebaseError, setFirebaseError] = React.useState(null);

  async function submitLink() {
    
    try {
      if (!user) {
        props.history.push("/login");
      }
      else {
        const {description, url} = values;

        const newLink = {
          url, 
          description,
          postedBy: {
            id: user.uid,
            name: user.displayName
          },
          voteCount: 0,
          votes: [],
          comments: [],
          created: Date.now()
        }

        console.log(firebase);

        firebase.db.collection("links").add(newLink);

        props.history.push("/");
        setFirebaseError(null);
      }
    }
    catch(err) {
      console.error("Submit Link Error", err);
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
        className = {errors.description && "error-input"}
        value={values.description}
        onChange={handleChange} 
        onBlur={handleBlur}  />
      {errors.description && <p className="error-text">{errors.description}</p>}
      <input 
        name="url" 
        placeholder="A URL for your link" 
        autoComplete="off" 
        type="text" 
        className = {errors.url && "error-input"}
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
