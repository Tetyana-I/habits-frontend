import "./Guide.css";

function Guide({step, title, description} ) {
    return (
        <div className="Guide">
            <div className="Guide-step">
                {step}
            </div>
            <h4 className="Guide-title">{title}</h4>
            <p>{description}</p>            
        </div>
    )
}

export default Guide;