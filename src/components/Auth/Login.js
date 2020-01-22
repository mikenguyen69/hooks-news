import React from "react";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import firebase from "../../firebase";
import {Link} from "react-router-dom";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
}

function Login(props) {
  const {handleChange, handleSubmit, handleBlur, errors, isSumitting, values } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
  
  const [login, setLogin] = React.useState(true);
  const [firebaseError, setFirebaseError] = React.useState(null);

  async function authenticateUser() {
    const {name, email, password} = values

    try {
      login 
      ? await firebase.login(email, password)
      : await firebase.register(name, email, password)

      setFirebaseError(null)

      props.history.push("/");

    } catch(err) {
      console.error("Authentication Error", err);
      setFirebaseError(err.message);
    }    
  }

  
  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        {!login && <input 
          type="text" 
          name="name"
          value={values.name} 
          onBlur = {handleBlur}
          onChange={handleChange} 
          placeholder="Your name" 
          autoComplete="off"
        />}

        <input 
          type="email" 
          name="email"
          value={values.email}
          onBlur = {handleBlur}
          onChange={handleChange} 
          className = {errors.email && "error-input"}
          placeholder="Your email" 
          autoComplete="off"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input 
          type="password" 
          name="password" 
          value={values.password}
          onBlur = {handleBlur}
          onChange={handleChange} 
          className = {errors.password && "error-input"}
          placeholder="Chose a secure password" 
          autoComplete="off"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {firebaseError && <p className="error-text">{firebaseError}</p>}
        <div className="flex mt3">
          <button type="submit" className="buttno pointer mr2" disabled={isSumitting} 
          style={{background: isSumitting ? "grey" : "orange"}}
          >
            Submit
          </button>
          <button type="button" className="pointer button" onClick={() => setLogin(prevLogin => !prevLogin)}>
            {login? "need to create an account?" : "already have an account?"}
          </button>
        </div>
      </form>
      <div className="forgot-password">
        <Link to="/forgot">forgot password?</Link>
      </div>
    </div>
  );
}

export default Login;
