import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import "../common/Form.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';

// Signup form.
// Shows form and manages update to state on changes.
// On submission:
// - calls signup function prop
// - redirects to /habits route
// Routes -> SignupForm -> Alert
// Routed as /signup

function SignupForm({ signup }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
      "SignupForm",
      "signup=", typeof signup,
      "formData=", formData,
      "formErrors=", formErrors,
  );

// Handle form submit:
// Calls sighup function prop and, if successful, redirect to /habits.

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await signup(formData);
    if (result.success) {
      history.push("/habits");
    } else {
      setFormErrors(result.errors);
    }
  }

//  Update form data field
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
      <div className="SignupForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h3 className="mb-3">Welcome to Good Habits!</h3>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>

                <div className="form-group">
                  <label>Username <FontAwesomeIcon icon={faUser} className="mx-2"/></label>
                  <input
                      name="username"
                      className="form-control"
                      minLength="1"
                      maxLength="25"
                      value={formData.username}
                      onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Password <FontAwesomeIcon icon={faKey} className="mx-2"/></label>
                  <input
                      type="password"
                      name="password"
                      className="form-control"
                      minLength="5"
                      value={formData.password}
                      onChange={handleChange}
                  />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                }

                <button
                    type="submit"
                    className="btn btn-primary float-right mt-3"
                    onSubmit={handleSubmit}
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default SignupForm;