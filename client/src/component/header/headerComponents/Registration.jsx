import React, { useState} from "react";
import api from '../../../services/apiAxios'
import style from "./Registration.module.css";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";

const Registration = () => {
  const [stateName, setStateName] = useState(true);
  // const [stateLog, setStateLog] = useState(true);
  const [statePas, setStatePas] = useState(true);
  // const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  // const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [statePhone, setStatePhone] = useState(true);
  const [phone, setPhone] = useState("");
  const [inputs, setInputs] = useState({});
  const nameHandler = (e) => {
    setName(e.target.value);
    if (e.target.value == 0) {
      setStateName(true);
    } else {
      setStateName(false);
    }
  };
  const phoneHandler = (e) => {
    setPhone(e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    if (e.target.value == 0) {
      setStatePhone(true);
    } else {
      setStatePhone(false);
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

  //Enter form
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const handleRegistUpload = async () => {
    let formData = [];
    formData.push(name, phone, password);
    try {
      const res = await api.post("/regist", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert('Вы зарегистрировались');
      console.log(res);
    } catch (err) {
      setError(err.message);
    }
  };


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
              name="name"
            />
            <label className={stateName ? style.modal_name_lab : style.name_off}>
              Name
            </label>
            <div className={style.line}></div>
            <InputMask
                  mask="+7(999)-999-99-99"
                  className={style.input_form}
                  id={style.three}
                  onChange={(e) => phoneHandler(e)}
                  value={phone}
                  name="phone"
                  type="text"
                />
            <label className={statePhone ? style.modal_log_lab : style.login_off}>
              Phone
            </label>
            <div className={style.line}></div>
            <input
              className={style.pass}
              type="text"
              onChange={(e) => passwordHandler(e)}
              value={password}
              name="password"
            />
            <label
              className={statePas ? style.modal_pass_lab : style.password_off}
            >
              Password
            </label>

            <div className={style.modal_btn}>
              <button className={style.modal_entrance} onClick={handleRegistUpload}>Зарегистрироваться</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
