import React, { useContext, useState } from "react";
import UserContext from "../auth/UserContext";
import HabitCard from "./HabitCard";
import GoodHabitsApi from "../api/api";

// Show list of habit cards.
//  HabitList -> HabitCardList -> HabitCard

function HabitCardList() {
    const { currentUser, setCurrentUser } = useContext(UserContext);  
    const [habits, setHabits] = useState(currentUser.habits);
    const [checked, setChecked] = useState(false);  
   
    console.debug(
        "HabitCardList",
        "currentUser=", currentUser,
        "habits=", currentUser.habits,
        "checked=", checked
    );
    

    // remove a habit
    async function deleteHabitById(id) {
        try {
            await GoodHabitsApi.removeHabit(id, currentUser.username);
            currentUser.habits = currentUser.habits.filter(habit => +habit.id !== +id);
            setCurrentUser(currentUser);
            setHabits(currentUser.habits);
            return { success: true };

        } catch (errors) {
            console.error("habit deletion failed", errors);
            return { success: false, errors };
        }
        }
    
    // update a habit
    // async function updateHabitById(id, data) {
    //     try {
    //         let res = await GoodHabitsApi.updateHabit(id, currentUser.username, data);
    //         console.log("res in updateHabitById func", res);
    //         let updatedHabitId = currentUser.habits.findIndex(habit => +habit.id === +id);
    //         currentUser.habits[updatedHabitId] = res;
    //         setCurrentUser(currentUser);
    //         setChecked(!checked);
    //         return { success: true };

    //     } catch (errors) {
    //         console.error("habit check failed", errors);
    //         return { success: false, errors };
    //     }
    //     }

    // check a habit
    async function checkHabitById(id, data) {
        try {
            let res = await GoodHabitsApi.checkHabit(id, currentUser.username, data);
            console.log("res in checkHabitById func", res);
            let updatedHabitId = currentUser.habits.findIndex(habit => +habit.id === +id);
            currentUser.habits[updatedHabitId] = res;
            setCurrentUser(currentUser);
            setChecked(!checked);
            return { success: true };

        } catch (errors) {
            console.error("habit check failed", errors);
            return { success: false, errors };
        }
        }

    let today = new Date().toISOString().slice(0, 10);
    //  if a habit has already been checked today it will disable the check button while rendering
  return (
      <div className="HabitCardList col-md-8 offset-md-2">
        {habits.map(habit =>  (habit.last_checked.slice(0,10)) === today ? (
            <HabitCard
                key={habit.id}
                id={habit.id}
                username={habit.username}
                title={habit.title}
                habit_description={habit.habit_description}
                streak_target={habit.streak_target}
                max_streak={habit.max_streak}
                attempt={habit.attempt}
                current_counter={habit.current_counter}
                last_checked={habit.last_checked}
                deleteHabitById={deleteHabitById}
                checkHabit={checkHabitById}
                done={true}
            />) : 
            (
            <HabitCard
                key={habit.id}
                id={habit.id}
                username={habit.username}
                title={habit.title}
                habit_description={habit.habit_description}
                streak_target={habit.streak_target}
                max_streak={habit.max_streak}
                attempt={habit.attempt}
                current_counter={habit.current_counter}
                last_checked={habit.last_checked}
                deleteHabitById={deleteHabitById}
                checkHabit={checkHabitById}
                done={false}
            />  
            )
        )}
      </div>
  );
}

export default HabitCardList;