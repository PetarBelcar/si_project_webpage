import { useState } from "react";
import Login from "../Login/Login";
import TypingData from "../TypingData/TypingData";

enum Tab {
    Login,
    TypingData,
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        backgroundColor: "#333",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
    },
    menu: {
        display: "flex",
        flexDirection: "row", // Make it a row
        justifyContent: "center", // Center the buttons horizontally
        alignItems: "center", // Center the buttons vertically
        height: "50px", // Adjust the height as needed
        backgroundColor: "#333",
        color: "#fff",
        borderBottom: "1px solid #ccc",
    },
    button: {
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

function Main() {
    const [selectedTab, SelectTab] = useState(Tab.Login);

    let renderedComponent = () => {
        if (selectedTab === Tab.Login) return <Login />;
        else return <TypingData />;
    };

    return (
        <div>
            <div style={styles.menu}>
                <button style={styles.button} onClick={() => SelectTab(Tab.Login)}>Login</button>
                <button style={styles.button} onClick={() => SelectTab(Tab.TypingData)}>
                    Typing Data
                </button>
            </div>

            <div style={styles.container}>{renderedComponent()}</div>
        </div>
    );
}

export default Main;
