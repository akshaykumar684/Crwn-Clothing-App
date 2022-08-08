import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signUpFormSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formFields);

    if (password !== confirmPassword) {
      alert("Password didnot match");
      return;
    }

    try {
      const user = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user,email already in use");
      } else {
        console.log("user creation encountered and error", error);
      }
    }
  };

  const formInputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={signUpFormSubmitHandler}>
        <FormInput
          label="Display Name"
          type="text"
          value={displayName}
          name="displayName"
          onChange={formInputChangeHandler}
          required
        />
        <FormInput
          label="Email"
          type="email"
          value={email}
          name="email"
          onChange={formInputChangeHandler}
          required
        />

        <FormInput
          label="Password"
          type="password"
          value={password}
          name="password"
          onChange={formInputChangeHandler}
          required
        />
        <FormInput
          label="Confirm Password"
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
