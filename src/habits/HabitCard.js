import React, { useState} from "react";
import "./HabitCard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

// import UserContext from "../auth/UserContext";

// Show limited information about a habit.
//  Is rendered by HabitCardList to show a "card" for each habit.
//  Receives deleteHabitById prop from parent, which is called on Delete.
//  HabitCardList -> HabitCard

function HabitCard(props) {
  console.debug("HabitCard");
  const [checked, setChecked] = useState(false);

  // Check a habit
  async function handleCheck(evt) {

    console.log("event=", evt.target.parentNode.id);
    let today = new Date().toISOString().slice(0, 10);
    console.log("today:", today);

    let result = await props.checkHabit(evt.target.parentNode.id, {last_checked: today});
    if (result.success) {
      console.debug("Updated successfully" );
      setChecked(true);
    } else {
      console.log("Update failed:", result.errors);
    }
  }

  // Handle a habit deletion
  async function handleDelete(evt) {
    let id = evt.target.parentNode.closest(".card-body").id
    let result = await props.deleteHabitById(id);
    if (result.success) {
      console.debug("Deleted successfully" );
    } else {
      console.log("Deletion failed:", result.errors);
    }
  }

  return (
      <div className="HabitCard card m-4">
        <div id={props.id} className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p>{props.habit_description}</p>
          <button
              className="btn btn-warning font-weight-bold text-uppercase float-right mx-3"
              onClick={handleCheck}
              disabled={checked || props.done}
          >
            {checked || props.done ? "Done" : "Check"}
          </button>
          <Link className="btn btn-outline-secondary font-weight-bold" to={`/habits/${props.id}`}>
            <b>Streak:</b> {props.current_counter} / {props.streak_target} days
          </Link>
          <button
              className="btn btn-secondary font-weight-bold mx-3"
              onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faTrashCan}/>
          </button>
        </div>
      </div>
  );
}

export default HabitCard;