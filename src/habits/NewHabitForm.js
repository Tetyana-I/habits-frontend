import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";

// NewHabit form.
// Shows form and manages update to state on changes.
// On submission:
//  - calls createNewHabit function prop
//  - redirects to /habits route
// Routes -> NewHabitForm -> Alert
// Routed as /habit

function NewHabitForm({ createNewHabit }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    title: "",
    habit_description: "",
    streak_target: 66
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
      "NewHabitForm",
      "createNewHabit=", typeof createNewHabit,
      "formData=", formData,
      "formErrors", formErrors,
  );

  // Handle form submit:
  // Calls createNewHabit function prop and, if successful, redirect to /habits.
  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await createNewHabit(formData);
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
      <div className="NewHabitForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h3 className="mb-3">My New Habit</h3>

          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>New Habit Title</label>
                  <input
                      name="title"
                      className="form-control"
                      value={formData.title}
                      minLength="1"
                      maxLength="50"
                      onChange={handleChange}
                      required
                  />
                </div>
                <div className="form-group">
                  <label>Habit Description</label>
                  <input
                      name="habit_description"
                      className="form-control"
                      value={formData.habit_description}
                      maxLength="250"
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Streak Target (days)</label>
                  <input
                      name="streak_target"
                      type="number"
                      className="form-control"
                      value={formData.streak_target}
                      onChange={handleChange}
                  />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}

                <button
                    className="btn btn-primary float-right mt-3"
                    onSubmit={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default NewHabitForm;