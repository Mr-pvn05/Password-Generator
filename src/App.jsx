import React, { useState, useCallback, useEffect, useRef} from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState();

  // use reference to target input field

  const passwordRef = useRef(null);

  // Password generating Logic !

  const passwordGenerator = useCallback(() => {
    let password = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      let numbers = "1234567890";
      string = string + numbers;
    }

    if (characterAllowed) {
      let characters = "!@#$%^&*()";
      string = string + characters;
    }

    for (let i = 1; i <= length; i++) {
      let indexValue = Math.floor(Math.random() * string.length + 1);
      password = password + string.charAt(indexValue);
    }

    setPassword(password);
  }, [numberAllowed, characterAllowed, length]);

  // Calling password genrator function

  useEffect(() => {
    passwordGenerator();
  },[length, numberAllowed, characterAllowed, setPassword])

  // Copy password to clipboard function

  const copyPasswordToClipboard = () => {

    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select();
  }

 

  // UI starts form here

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center gap-4">
      <h1 className="text-3xl text-center font-bold">Password Generator</h1>
      <div className="bg-red-800 p-6 lg:w-1/3 flex flex-col gap-4">
        <div className="w-full">
          <input
            className="text-black border-none lg:w-[84%] p-3 rounded-tl-md rounded-bl-md text-lg"
            type="text"
            placeholder="password"
            value={password}
            ref={passwordRef}
            readOnly
            />
          <button onClick={copyPasswordToClipboard} className="bg-blue-500 hover:bg-blue-700 border-none py-3 px-4 rounded-tr-md rounded-br-md text-lg">
            Copy
          </button>
        </div>
        <div className="lg:flex justify-between">
          <div className="flex justify-between">
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="accent-blue-500 max-sm:w-[65%] mr-2"
            />
            <p>Length : {length}</p>
          </div>
          <div className="flex gap-1 items-center">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() =>
                setNumberAllowed((previousValue) => !previousValue)
              }
              className="accent-blue-500"
            />
            <label htmlFor="">Numbers</label>
          </div>
          <div className="flex gap-1 items-center">
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              onChange={() =>
                setCharacterAllowed((previousValue) => !previousValue)
              }
              className="accent-blue-500"
            />
            <label htmlFor="">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
