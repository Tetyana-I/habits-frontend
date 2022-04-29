import "./Streak.css";

function Streak(props) {
    return (
        <div className="circlething">
            <div className="circlething__label">Streak</div>
            <div className="circlething__value">{props.current_counter}</div>
        </div>
    )
}

export default Streak;
