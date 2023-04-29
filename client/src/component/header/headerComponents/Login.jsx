import React, { useState, useEffect } from "react";
import api from '../../../services/apiAxios'
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";

const Login = ({onChange}) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(true);
  const [state, setState] = useState(true);
  const [logg, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
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
  const [backendData, setBackendData] = useState([]);
  const [callback, setCallback] = useState(false);
    try {
    useEffect(() => {
        fetch("/login")
          .then((response) => response.json())
          .then((data) => {
            setBackendData(data);
          });
      }, []);
      
    }catch (e){
      console.log(e);
    }
  const handleLoginUpload = async () => {
    const formData = [];
    formData.push(logg, password);
    console.log(formData)
    if (logg && password) {
      try {
        const res = await api.post("/login", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // setUploaded(formData.image)
        console.log(res);
        alert("Вход выполнен")
        if (logg === "Admin" && password === "root") {
          setCallback(true);
          onChange(callback)
 
        }
      } catch (err) {
        setError(err.message);
      };
    }else{alert('Вы не заполнили форму')}
  };

  
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
              <InputMask
                  mask="+7(999)-999-99-99"
                  className={style.login}
                  onChange={(e)=> loginHandler(e)}
                  value={logg}
                  name="phone"
                  type="text"
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
              <button className={style.modal_entrance} onClick={handleLoginUpload}>Войти</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
