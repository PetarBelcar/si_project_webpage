import React, { useState } from "react";

const TypingData: React.FC = () => {
  const stringList: string[] = [
    "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.",
    "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
    "If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.",
    "Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    "The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.",
    "mperfection is beauty, madness is genius and it's better to be absolutely ridiculous than absolutely boring.",
    "It is better to remain silent at the risk of being thought a fool, than to talk and remove all doubt of it.",
    "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.",
  ];

  const [inputData, setInputData] = useState<{
    [key: string]: {
      value: string;
      events: { type: string; timestamp: number }[];
    };
  }>({});

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    stringValue: string
  ) => {
    const { key, repeat } = event;
    if (!repeat && key.length === 1) {
      const value = inputData[stringValue]?.value || "";
      const timestamp = Date.now();
      const newEvent = { type: "keyDown", timestamp };
      setInputData((prevData) => ({
        ...prevData,
        [stringValue]: {
          value: value,
          events: [...(prevData[stringValue]?.events || []), newEvent],
        },
      }));
    }
  };

  const handleKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
    stringValue: string
  ) => {
    event.preventDefault();
    const timestamp = Date.now();
    const newEvent = { type: "keyUp", timestamp };
    setInputData((prevData) => ({
      ...prevData,
      [stringValue]: {
        ...prevData[stringValue],
        events: [...(prevData[stringValue]?.events || []), newEvent],
      },
    }));
  };
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    stringValue: string
  ) => {
    const { value } = event.target;
    setInputData((prevData) => ({
      ...prevData,
      [stringValue]: {
        value,
        events: prevData[stringValue]?.events || [],
      },
    }));
  };

  const handleDownloadJSON = () => {
    const jsonString = JSON.stringify(inputData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "input_data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.container}>
      {stringList.map((stringValue, index) => (
        <div key={index}>
          <span style={styles.quoteContainer}>{stringValue}</span> 
          <input
            type="text"
            value={inputData[stringValue]?.value || ""}
            onChange={(event) => handleInputChange(event, stringValue)}
            onKeyDown={(event) => handleKeyDown(event, stringValue)}
            onKeyUp={(event) => handleKeyUp(event, stringValue)}
            style={styles.input}
          />
          <br/>
        </div>
      ))}
      <button style={styles.button} onClick={handleDownloadJSON}>Download CSV</button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        maxWidth: "400px",
        margin: "auto",
    },
    input: {
        width: "100%",
        marginBottom: "10px",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxSizing: "border-box",
    },
    quoteContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px",
    },
    button: {
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
    },
    statusMessage: {
        marginTop: "10px",
        color: "red",
    },
};

export default TypingData;
