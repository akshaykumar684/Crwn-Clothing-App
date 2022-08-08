import "./sign-in-form.styles.scss";
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const logInWithGoogleHandler = async () => {
    const { user } = await signInWithGooglePopup();
    //const userDocRef = await createUserDocumentFromAuth(user);
    await createUserDocumentFromAuth(user);
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInFormSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        alert("incorrect password for email");
      } else if (error.code === "auth/user-not-found") {
        alert("invalid email");
      } else {
        console.log(error);
      }
    }
  };

  const formInputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-in-container">
      <h2>Already have an account</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={signInFormSubmitHandler}>
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType="google"
            onClick={logInWithGoogleHandler}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
