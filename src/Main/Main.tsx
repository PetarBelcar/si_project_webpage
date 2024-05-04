import { useState } from "react";
import Login from "../Login/Login";
import TypingData from "../TypingData/TypingData";

enum Tab{
    Login,
    TypingData
}

function Main() {
    const [selectedTab, SelectTab] = useState(Tab.Login)

    let renderedComponent = () => {
        if (selectedTab === Tab.Login) return <Login />;
        else return <TypingData />
    }

    return (
        <div>
        <div>
            <button onClick={() => SelectTab(Tab.Login)}>Login</button>
            <button onClick={() => SelectTab(Tab.TypingData)}>Typing Data</button>
        </div>
                
            {renderedComponent()}
        </div>
    )
}

export default Main;
