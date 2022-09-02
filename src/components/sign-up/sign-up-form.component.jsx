import { useState } from "react";

import FormInput from "../form-input/form-input.component";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

//make an object having the four values that we need for the form
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  // make a state that updates the defaultFormfields
  const [formFields, setFormFields] = useState(defaultFormFields);
  //destructuring
  const { displayName, email, password, confirmPassword } = formFields;

  // reset the form fields
  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  // handle the sumbit to the form
  const handleSumbit = async (event) => {
    event.preventDefault();
    // if the password is not the same as the confirmpassword then alert the user and do not continue
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // try catch block
    try {
      // assign properties to the user by destructuring
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      // use additional information {displayName} if the email is not verified
      // WHen it is not verified it means that there is not name so we use our form
      // to display one
      await createUserDocumentFromAuth(user, { displayName });
      resetFormField();
    } catch (err) {
      // catch the error and alert the user "auth/email-aready-in-use" comes from firebase
      // that way we can always be sure if the email is in use or not.
      if (err.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("User creation encountered an error", err);
      }
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
    <div className="sign-up-container">
      <h2>Do not have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSumbit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button buttonType="" type="sumbit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
