import { useState } from "react";

function Login() {
    const quateStrings = [
        "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
        "You only live once, but if you do it right, once is enough.",
        "Be the change that you wish to see in the world.",
        "In three words I can sum up everything I've learned about life: it goes on.",
        "Don’t walk in front of me… I may not follow ,Don’t walk behind me… I may not lead, Walk beside me… just be my friend",
        "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
        "A friend is someone who knows all about you and still loves you.",
        "To live is the rarest thing in the world. Most people exist, that is all.",
        "Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.",
        "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    ];
    const [randomQuate, _setRandomeQuate] = useState<string>(
        quateStrings[Math.floor(Math.random() * quateStrings.length)]
    );

    const [events, setEventsData] = useState<
        { type: string; timestamp: number }[]
    >([]);

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [quate, setQuate] = useState<string>("");

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { key, repeat } = event;
        if (!repeat && key.length === 1) {
            const timestamp = Date.now();
            const newEvent = { type: "keyDown", timestamp };
            setEventsData([...events, newEvent]);
        }
    };

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        const timestamp = Date.now();
        const newEvent = { type: "keyUp", timestamp };
        setEventsData([...events, newEvent]);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setQuate(value);
    };

    const handleLogin = () => {
        console.log(events);
        const requestBody = {
            username: username,
            password: password,
            events: events,
        };
        console.log(requestBody);
    };

    return (
        <div>
            <p>Username</p>
            <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />{" "}
            <br />
            <p>Password</p>
            <input
                type="text"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />{" "}
            <br />
            <div key={0}>
                <span>{randomQuate}</span> <br />
                <input
                    type="text"
                    value={quate}
                    onChange={(event) => handleInputChange(event)}
                    onKeyDown={(event) => handleKeyDown(event)}
                    onKeyUp={(event) => handleKeyUp(event)}
                    style={{ width: "300px" }}
                />
            </div>
            <button onClick={(_event) => handleLogin()}>Login</button>
        </div>
    );
}

export default Login;
