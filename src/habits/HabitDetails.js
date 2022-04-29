import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import GoodHabitsApi from "../api/api";
import UserContext from "../auth/UserContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faRocket, faTrophy } from '@fortawesome/free-solid-svg-icons';
import "./HabitDetails.css";
import Streak from "./Streak";

// Habit Detail page.
// Renders information about habit
// Routed at /habits/:id
// Routes -> HabitDetails

function HabitDetails() {
  const { id } = useParams();
  console.debug("HabitDetail", "id=", id);
  const { currentUser } = useContext(UserContext); 
  const [habit, setHabit] = useState(null);

  useEffect(function getHabitById() {
    async function getHabit() {
      setHabit(await GoodHabitsApi.getHabit(id, currentUser.username));
    }
    getHabit();
  }, [id, currentUser.username]);

  if (!habit) return (
      <div>
        <p className="lead mt-4"> Hmm... couldn't find this habit information :( </p> 
        <Link className="btn btn-secondary font-weight-bold" to={`/habits`}>
            <FontAwesomeIcon icon={faArrowLeft}/>
        </Link>
      </div>
  )

  let success = Math.floor((+habit.current_counter/+habit.streak_target)*100);
  return (
      <div className="HabitDetails">
        <Streak current_counter={habit.current_counter} />
        <h4 className="mt-2">{habit.title}</h4> 
        <p className="my-1">{habit.habit_description}</p> 
        <hr/>
        <p className="lead">Goal: <b>{habit.streak_target}   </b>Streak: <b>{habit.current_counter}</b></p>
        <p className="lead"><FontAwesomeIcon icon={faTrophy}/> Maximum streak: <b>{habit.max_streak}</b></p>
        <p className="lead">Attempt: <b>{habit.attempt}</b></p>
        <p className="lead"><FontAwesomeIcon icon={faRocket}/> Success: <b>{success}</b> %</p>
        <Link className="btn btn-outline-secondary font-weight-bold my-3" to={`/habits`}>
            <FontAwesomeIcon icon={faArrowLeft}/>
        </Link>
      </div>
    )
  };

export default HabitDetails;