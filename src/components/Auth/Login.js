import React from "react";
import useFormValidation from './useFormValidation';

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
}

function Login(props) {
  const { handleChange, handleSubmit, values } = useFormValidation(INITIAL_STATE);
  const [login, setLogin] = React.useState(true);

  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        {!login && <input 
          type="text" 
          name="name"
          value={values.name}
          onChange={handleChange} 
          placeholder="Your name" 
          autoComplete="off"
        />}

        <input 
          type="email" 
          name="email"
          value={values.email}
          onChange={handleChange} 
          placeholder="Your email" 
          autoComplete="off"
        />

        <input 
          type="password" 
          name="password" 
          value={values.password}
          onChange={handleChange} 
          placeholder="Chose a secure password" 
          autoComplete="off"
        />
        <div className="flex mt3">
          <button type="submit" className="buttno pointer mr2">
            Submit
          </button>
          <button type="button" className="pointer button" onClick={() => setLogin(prevLogin => !prevLogin)}>
            {login? "need to create an account?" : "already have an account?"}
          </button>
        </div>

      </form>
    </div>
  );
}

export default Login;
