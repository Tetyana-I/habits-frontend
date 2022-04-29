import './App.css';
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes-nav/Routes";
import React, { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes-nav/Navigation";
import LoadingSpinner from "./common/LoadingSpinner";
import GoodHabitsApi from "./api/api";
import UserContext from "./auth/UserContext";
import jwt_decode from "jwt-decode";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "habits-token";


function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  // const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
      "App",
      "infoLoaded=", infoLoaded,
      "currentUser=", currentUser,
      "token=", token,
  );

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt_decode(token);
          console.log("username in app", username);
          // put the token on the Api class so it can use it to call the API.
          GoodHabitsApi.token = token;
          let currentUser = await GoodHabitsApi.getCurrentUser(username);
          setCurrentUser(currentUser);

        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  async function signup(signupData) {
    try {
      let token = await GoodHabitsApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }
  
  async function login(loginData) {
    try {
      let token = await GoodHabitsApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  // Handles site-wide logout
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  // hadle new habit creation
  async function createNewHabit(inputData) {
    try {
      let newHabit = await GoodHabitsApi.createHabit({
        "username": currentUser.username,
        "max_streak": 0,
        "attempt": 0,
        "current_counter": 0,
        "last_checked": "1900-01-01",
        "title": inputData.title,
        "habit_description": inputData.habit_description,
        "streak_target": Number(inputData.streak_target)
      });

      console.log("newHabit in CreateNewHabit", newHabit);
      currentUser.habits.push(newHabit);
      setCurrentUser(currentUser);
      return { success: true };

    } catch (errors) {
      console.error("habit creation failed", errors);
      return { success: false, errors };
    }
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider
          value={{ currentUser, setCurrentUser }}>
        <div className="App">
          <Navigation logout={logout} />
          <Routes 
            login={login} 
            signup={signup} 
            createNewHabit={createNewHabit} 
            />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;