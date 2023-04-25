import React, { useState } from "react";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState(true);
  const [state, setState] = useState(true);
  const [logg, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = (e) => {
    setLogin(e.target.value);
    if (e.target.value == 0) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value == 0) {
      setState(true);
    } else {
      setState(false);
    }
  };
  const [showResults, setShowResults] = useState(false);

  return (
    <>
      <div className={style.modal} onClick={() => setShowResults(false)}>
        <div
          className={style.modal__content}
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className={style.header_modal}>Вход</h1>
          <div
            className={style.close}
            tabIndex={1}
            onClick={() => navigate(-1)}
          ></div>
          <div className={style.modal_form}>
            <form method="GET">
              <input
                className={style.login}
                type="text"
                onChange={(e) => loginHandler(e)}
                value={logg}
                name="number"
              />
              <label className={status ? style.modal_log_lab : style.login_off}>
                Number
              </label>

              <input
                className={style.pass}
                type="text"
                onChange={(e) => passwordHandler(e)}
                value={password}
                name="password"
              />
              <label
                className={state ? style.modal_pass_lab : style.password_off}
              >
                Password
              </label>
            </form>
            <div className={style.modal_btn}>
              <button className={style.modal_entrance}>Войти</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
