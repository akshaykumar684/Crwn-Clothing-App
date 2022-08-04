import { useState } from "react";
import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const signUpFormSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("Form Submitted");
    console.log(formFields);
    const { email, password } = formFields;
    const user = await createAuthUserWithEmailAndPassword(email, password);
    console.log(user);
  };

  const formInputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={signUpFormSubmitHandler}>
        <label>Display Name</label>
        <input
          type="text"
          value={displayName}
          name="displayName"
          onChange={formInputChangeHandler}
          required
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          name="email"
          onChange={formInputChangeHandler}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          name="password"
          onChange={formInputChangeHandler}
          required
        />
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          name="confirmPassword"
          onChange={formInputChangeHandler}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
