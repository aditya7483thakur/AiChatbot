import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { RiRobot2Line } from "react-icons/ri";
import { FaArrowUpLong } from "react-icons/fa6";
import Typing from "./components/Typing";
const App = () => {
  const [array, setArray] = useState([]);
  const query = useRef("");
  const [typing, setTyping] = useState(false);

  const handleQuery = async () => {
    setArray((prevarray) => [...prevarray, `YOU : ${query.current.value}`]);

    const url = "https://open-ai21.p.rapidapi.com/conversationgpt35";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: query.current.value,
          },
        ],
        web_access: false,
        system_prompt: "",
        temperature: 0.9,
        top_k: 5,
        top_p: 0.9,
        max_tokens: 256,
      }),
    };

    try {
      setTyping(true);
      const response = await fetch(url, options);
      const json = await response.json();
      setArray((prevarray) => [...prevarray, `AI : ${json.result}`]);
      setTyping(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    query.current.value = "";
  }, [array]);
  return (
    <>
      <div className="row min-vh-100">
        <div className="col-2 left-comp d-flex flex-column ">
          <div className="d-flex text-white justify-content-between">
            <h3 className="mt-5">Chatbot-AI</h3>
            <h3 className="mt-5 ">
              <RiRobot2Line />
            </h3>
          </div>
          <hr style={{ color: "white" }} />
          <div className="w-100 mx-1 ">
            <button
              type="button"
              className="btn btn-primary mx-auto my-3 w-100"
            >
              + New Connection
            </button>

            <button
              type="button"
              className="btn btn-outline-light text-center my-3 mx-auto w-100"
              onClick={() => {
                query.current.value = "Who is Albert Einstien ?";
                handleQuery();
              }}
            >
              "Who is Albert Einstien ?"
            </button>
            <button
              type="button"
              className="btn btn-outline-light text-center my-3 mx-auto w-100"
              onClick={() => {
                query.current.value = "Give me project ideas !";
                handleQuery();
              }}
            >
              "Give me project ideas !"
            </button>
            <button
              type="button"
              className="btn btn-outline-light text-center my-3 mx-auto w-100"
              onClick={() => {
                query.current.value = "Give me roadmap for React.";
                handleQuery();
              }}
            >
              "Give me roadmap for React."
            </button>
            <button
              type="button"
              className="btn btn-outline-light text-center my-3 w-100 mx-auto"
              onClick={() => {
                query.current.value = "What is mitochondria ?";
                handleQuery();
              }}
            >
              "What is mitochondria ?"
            </button>
          </div>
        </div>
        <div className="col-10">
          <div className="right-comp">
            <div className="logo-desc text-light">
              <div className="icon">
                <RiRobot2Line />
              </div>
              <h1>AI Chatbot</h1>
            </div>
            <div className="chat text-light overflow-auto">
              {array.map((item) => {
                return (
                  <div
                    className="mb-4 rounded border border-light p-2"
                    key={item}
                  >
                    {item}
                  </div>
                );
              })}
              {typing && <Typing />}
            </div>
            <div className="d-flex  justify-content-around input-div flex-nowrap ">
              <textarea
                className="text-light overflow-auto p-2"
                placeholder="Ask your question here..."
                ref={query}
              />
              <button
                type="button"
                onClick={handleQuery}
                className="btn btn-success send"
              >
                <FaArrowUpLong style={{ height: "2rem" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
