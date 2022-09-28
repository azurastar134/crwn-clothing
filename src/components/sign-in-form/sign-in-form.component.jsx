import { useState } from "react";

import FormInput from "../form-input/form-input.component";

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";
import Button from "../button/button.component";

//make an object having the 2 values that we need for the sign-in form
const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  // make a state that updates the defaultFormfields
  const [formFields, setFormFields] = useState(defaultFormFields);
  //destructuring
  const { email, password } = formFields;

  // reset the form fields
  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  // handle the sumbit to the form
  const handleSumbit = async (event) => {
    event.preventDefault();

    // try catch block
    try {
      await signInAuthUserWithEmailAndPassword(email, password);

      resetFormField();
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email");
          break;
        default:
          console.log(err);
      }
      console.log(err);
    }
  };

  // since name and value overlapping we create a handle method to
  // fix this and update the formFields value by using the setFormFields
  const handleChange = (event) => {
    //give me the name and the value of the event
    const { name, value } = event.target;
    //update the name by the value
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSumbit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button buttonType="" type="sumbit">
            Sign In
          </Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Gmail
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
