import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import Quote from "./Quote";
import { Link } from "react-router-dom";
import HabitCardList from "./HabitCardList";

// Show page with list of habits from current user.
// This is routed to /habits

function HabitList() {
  const { currentUser } = useContext(UserContext);  

  console.debug(
    "HabitList",
    "currentUser=", currentUser,
    "habits=", currentUser.habits,
    "habits.length =", currentUser.habits.length
);


  return (
      <div className="HabitList">
          <Quote />
          <Link className="btn btn-outline-primary font-weight-bold text-uppercase my-4" to="/habit">
            New Habit
          </Link>
          {currentUser.habits.length
            ? <HabitCardList />
            : <p className="lead mt-3">Hmm... seems like nothing to do today :) </p>
        }
      </div>
  );
}


export default HabitList;