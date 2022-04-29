import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import "../common/Form.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';

// Login form.
// Shows form and manages update to state on changes.
// On submission:
//  - calls login function prop
//  - redirects to /habits route
// Routes -> LoginForm -> Alert
// Routed as /login

function LoginForm({ login }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
      "LoginForm",
      "login=", typeof login,
      "formData=", formData,
      "formErrors", formErrors,
  );

  // Handle form submit:
  // Calls login function prop and, if successful, redirect to /habits.
  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData);
    console.log("result in login", result);
    if (result.success) {
      history.push("/habits");
    } else {
      setFormErrors(result.errors);
    }
  }

  // Update form data field
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(l => ({ ...l, [name]: value }));
  }

  return (
      <div className="LoginForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h3 className="mb-3">Welcome Back!</h3>

          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username <FontAwesomeIcon icon={faUser} className="mx-2"/></label>
                  <input
                      name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
                      autoComplete="username"
                      required
                  />
                </div>
                <div className="form-group">
                  <label>Password <FontAwesomeIcon icon={faKey} className="mx-2"/></label>
                  <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      required
                  />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}

                <button
                    className="btn btn-primary float-right mt-3"
                    onSubmit={handleSubmit}
                >
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default LoginForm;