import React, { useState } from "react";
import style from "./Registration.module.css";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [stateName, setStateName] = useState(true);
  const [stateLog, setStateLog] = useState(true);
  const [statePas, setStatePas] = useState(true);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const nameHandler = (e) => {
    setName(e.target.value);
    if (e.target.value == 0) {
      setStateName(true);
    } else {
      setStateName(false);
    }
  };
  const loginHandler = (e) => {
    setLogin(e.target.value);
    if (e.target.value == 0) {
      setStateLog(true);
    } else {
      setStateLog(false);
    }
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value == 0) {
      setStatePas(true);
    } else {
      setStatePas(false);
    }
  };
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);

  return (
    <>
      <div className={style.modal} onClick={() => setShowResults(false)}>
        <div
          className={style.modal__content}
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className={style.header_modal}>Регистрация</h1>
          <div className={style.close}
          tabIndex={1}
          onClick={() => navigate(-1)}
          ></div>
          <div className={style.modal_form}>
            <input
              className={style.name}
              type="text"
              onChange={(e) => nameHandler(e)}
              value={name}
            />
            <label className={stateName ? style.modal_name_lab : style.name_off}>
              Name
            </label>
            <div className={style.line}></div>
            <input
              className={style.login}
              type="text"
              onChange={(e) => loginHandler(e)}
              value={login}
            />
            <label className={stateLog ? style.modal_log_lab : style.login_off}>
              Login
            </label>
            <div className={style.line}></div>

            <input
              className={style.pass}
              type="text"
              onChange={(e) => passwordHandler(e)}
              value={password}
            />
            <label
              className={statePas ? style.modal_pass_lab : style.password_off}
            >
              Password
            </label>

            <div className={style.modal_btn}>
              <button
                className={style.modal_entrance}
              >
                Зарегистрироваться
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
