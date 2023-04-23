import React, { useState } from "react";
import style from "./SliderForm.module.css";

const SliderForm = () => {
  const [status, setStatus] = useState(true);
  const [state, setState] = useState(true);
  const [login, setLogin] = useState("");
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

  return (
    <>
      <div className={style.modal}>
        <div
          className={style.modal__content}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={style.modal_form}>
            <div className={style.close}></div>
            <h1>Вход</h1>
            <input
              className={style.login}
              type="text"
              onChange={(e) => loginHandler(e)}
              value={login}
            />
            <label className={status ? style.modal_log_lab : style.login_off}>
              Login
            </label>

            <input
              className={style.pass}
              type="text"
              onChange={(e) => passwordHandler(e)}
              value={password}
            />
            <label
              className={state ? style.modal_pass_lab : style.password_off}
            >
              Password
            </label>

            <div className={style.modal_btn}>
              <button className={style.modal_entrance}>Войти</button>
              <div className={style.line}></div>
              <button className={style.modal_reg}>Зарегистрироваться</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SliderForm;
