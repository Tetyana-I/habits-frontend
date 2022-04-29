import Guide from "./Guide";

function GuideList() {
    return (
            <div className="row mt-4 justify-content-center">
            <Guide 
            step="1"
            title="Setup Your Account"
            description="It will take just a few seconds to create your account, and you will be able to track your habits from any of your devices"
            />
            <Guide 
            step="2"
            title="Add Habits"
            description="Add a new habit that you are planning to develop or everyday todo and choose your streak target in days, for example,  'title': 'Exercise', 'description': '10 min yoga, 30 min walking', 'streak': 30 days"
            />
            <Guide 
            step="3"
            title="Check your habit"
            description="Check your habit each day by pressing CHECK button for the habit. If you miss even a day you would start your current streak all over again."
            />
            <Guide 
            step="4"
            title="Track your progress"
            description="You can track your current progress and other stats for each of your habits or todos at any moment."
            />
        </div>
        )
}

export default GuideList;