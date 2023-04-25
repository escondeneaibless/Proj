import React, { useState } from "react";
import style from "./ModalChat.module.css";
import Messages from "./MessageItems";

const Chat = () => {
  let textInput = React.createRef();
  const [show, setShow] = useState("");
  const [components, setComponents] = useState([""]);
  function showInput(event) {
    setShow(textInput.current.value);
  }
  function addComponent() {
    setComponents([...components, show]);
  }
  let mas = [];
  mas.push(showInput);
  return (
    <>
      <div className={style.content}>
        <div className={style.helper}>
          <div className={style.avatar}>
            <svg width="40" height="40" viewBox="0 0 800 800" fill="none">
              <circle cx="400" cy="400" r="400" fill="#D9D9D9" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M400.5 491C463.737 491 515 438.617 515 374C515 309.383 463.737 257 400.5 257C337.263 257 286 309.383 286 374C286 438.617 337.263 491 400.5 491ZM321 536C226.199 536 145.214 595.156 112.946 678.568C185.639 753.462 287.385 800 400 800C512.615 800 614.361 753.462 687.054 678.568C654.786 595.156 573.801 536 479 536H321Z"
                fill="black"
              />
            </svg>
          </div>
          <p>Менеджер</p>
        </div>
        <div className={style.chat_window}>
          {components.map((item, i) => (
            <Messages text={item} id={i} />
          ))}
        </div>
        <div className={style.stroke_enter}>
          <input type="text" onInput={showInput} ref={textInput} value={show} />
          <button className={style.enter} onClick={addComponent}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 555 620"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M94.1406 340.464C117.832 327.064 117.832 292.936 94.1406 279.536L0 226.287V35.722C0 8.91624 28.8995 -7.93947 52.2315 5.25773L537.141 279.536C560.832 292.936 560.832 327.064 537.141 340.464L52.2315 614.742C28.8995 627.939 0 611.084 0 584.278V393.713L94.1406 340.464Z"
                fill="#336F4B"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
