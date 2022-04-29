import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../auth/UserContext";
import HabitList from "../habits/HabitList";
import GuideList from "./GuideList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';

// Homepage of site.
// Shows welcome message or login/register buttons.
// 
// Routed at /
//  Routes -> Homepage

function Homepage() {
    const { currentUser } = useContext(UserContext);
    console.debug("Homepage", "currentUser=", currentUser);

  return (
      <div className="Homepage">
        <div className="container text-center">
          {currentUser
              ? <HabitList />
              : (
                  <div>
                    <h2 className="Homepage-title mb-3 font-weight-bold">
                        Let's get started! 
                        <FontAwesomeIcon className="mx-3" icon={faRocket}/>
                    </h2>
                    <div className="Homepage-quote">
                        <p className="lead">
                            "People do not decide their futures, they decide their habits and their habits decide their futures"
                        </p>
                        <p> - F.M Alexander</p>
                    </div>
                    <Link className="btn btn-primary font-weight-bold mt-4"
                          to="/login">
                      Log in
                    </Link>
                    <Link className="btn btn-outline-primary font-weight-bold mx-3 mt-4"
                          to="/signup">
                      Sign up
                    </Link>
                    <GuideList /> 
                  </div>
              )}
        </div>
      </div>
  );
}

export default Homepage;