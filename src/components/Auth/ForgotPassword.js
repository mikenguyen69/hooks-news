import React from "react";
import FirebaseContext from "../../firebase/context";

function ForgotPassword() {
  const {firebase} = React.useContext(FirebaseContext);
  const [resetPasswordEmail, setRestPasswordEmail] = React.useState("");
  const [isPasswordReset, setIsPasswordReset] = React.useState(false);
  const [passwordResetError, setPasswordResetError] = React.useState(null);

  async function handleResetPassword() {
    try {          
      await firebase.resetPassword(resetPasswordEmail);
      setIsPasswordReset(true);
      setPasswordResetError(null);
    } catch(err) {
      console.error("Error sending email", err);
      setPasswordResetError(err.message);
    }
  }

  return (
  <div>
    <input type="email" className="input" placeholder="Provide your account email" onChange={event => setRestPasswordEmail(event.target.value)} />
    <div>
      <button className="button" onClick={handleResetPassword}>
        Reset Password
      </button>
    </div> 
    {isPasswordReset && <p>Check email to reset password.</p>}
  {passwordResetError && <p className="error-text">{passwordResetError}</p>}
  </div>);
}

export default ForgotPassword;
