import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import NewHabitForm from "../habits/NewHabitForm";
import HabitList from "../habits/HabitList";
import HabitDetails from "../habits/HabitDetails";

import PrivateRoute from "./PrivateRoute";



// Site-wide routes.
// Parts of site are only visitable when logged in. Those routes are
// wrapped by <PrivateRoute>, which is an authorization component.
// Visiting a non-existant route redirects to the homepage.

function Routes({ login, signup, createNewHabit,  }) {
  console.debug(
      "Routes",
      `login=${typeof login}`,
      `signup=${typeof signup}`,
  );

  return (
      <div className="pt-5">
        <Switch>

          <Route exact path="/">
            <Homepage />
          </Route>

          <Route exact path="/login">
            <LoginForm login={login} />
          </Route>

          <Route exact path="/signup">
            <SignupForm signup={signup} />
          </Route>
          
          <PrivateRoute exact path="/habits/:id">
            <HabitDetails />
          </PrivateRoute>

          <PrivateRoute exact path="/habits">
            <HabitList />
          </PrivateRoute>

          <PrivateRoute exact path="/habit">
            <NewHabitForm createNewHabit={createNewHabit}/>
          </PrivateRoute>

          <Redirect to="/" />

        </Switch>
      </div>
  );
}

export default Routes;
