import React, { useState } from "react";

const TypingData: React.FC = () => {
  // Define your list of strings
  const stringList: string[] = [
    "Be yourself; everyone else is already taken.",
    "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
    "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.",
    "You've gotta dance like there's nobody watching, Love like you'll never be hurt, Sing like there's nobody listening, And live like it's heaven on earth.",
  ];

  // State to store input values
  const [inputData, setInputData] = useState<{
    [key: string]: {
      value: string;
      events: { type: string; timestamp: number }[];
    };
  }>({});

  // Function to handle key events
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    stringValue: string
  ) => {
    const { key, repeat } = event;
    if (!repeat && key.length === 1) {
      // Check if the key is a printable character
      const value = inputData[stringValue]?.value || ""; // Provide default empty string if undefined
      const timestamp = Date.now();
      const newEvent = { type: "keyDown", timestamp };
      setInputData((prevData) => ({
        ...prevData,
        [stringValue]: {
          value: value, // Append the pressed key to the existing value
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
        events: [...prevData[stringValue]?.events || [], newEvent],
      },
    }));
  };
  // Function to handle input changes
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

  // Function to generate and download JSON file
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
    <div>
      {stringList.map((stringValue, index) => (
        <div key={index}>
          <span>{stringValue}</span> <br />
          <input
            type="text"
            value={inputData[stringValue]?.value || ""}
            onChange={(event) => handleInputChange(event, stringValue)}
            onKeyDown={(event) => handleKeyDown(event, stringValue)}
            onKeyUp={(event) => handleKeyUp(event, stringValue)}
            style={{ width: "300px" }}
          />
        </div>
      ))}
      <button onClick={handleDownloadJSON}>Download JSON</button>
    </div>
  );
};

export default TypingData;
