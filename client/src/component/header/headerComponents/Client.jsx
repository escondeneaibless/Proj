import React, { useState, useEffect } from "react";
import api from "../../../services/apiAxios";
import style from "./Client.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import qwe from = '../../../../../s'
function Client({ props }) {
  const [backend, setBackend] = useState([]);
  const [listUser, setListUser] = useState("");
  const [listForms, setListForms] = useState("");
  const [showlist, setShowList] = useState(false);
  const [showform, setShowForm] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleUser = (e) => {
    setListUser(e.target.value);
    console.log(e.target.value);
  };
  const handleForms = (e) => {
    setListForms(e.target.value);
    console.log(e.target.value);
  };
  const handleList = () => {
    setShowList(false);
    setShowForm(true);
  };
  const handleForm = () => {
    setShowForm(false);
    setShowList(true);
  };
  const loadingStr = () => {
    navigate(-1);
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  return (
    <>
      <div className={style.block}>
        <div className={style.operation}>
          <div className={style.opers} onClick={loadingStr}>
            Сайт
          </div>
          <button
            className={style.opers}
            id={showlist ? style.list : style.list_off}
            onClick={handleList}
          >
            Список пользователей
          </button>
          <button
            className={style.opers}
            id={showform ? style.form : style.form_off}
            onClick={handleForm}
          >
            Формы заявок
          </button>
        </div>
        <div className={style.list}>
          <div className={style.prokrutka}>
            {showform ? (
              <div className={style.forms}>
                <div
                  style={{
                    display: "flex",
                    marginBottom: "20px",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  <span style={{ width: "215px" }}>Имя</span>
                  <span style={{ width: "215px" }}>Номер</span>
                  <span style={{ width: "215px" }}>Пароль</span>
                  <span style={{ width: "215px" }}>Роль</span>
                </div>
                <div>
                  {props[0].user.map((item) => (
                    <div id={item.id} className={style.listUsers}>
                      <span id={style.name} className={style.items}>
                        {item.name}
                      </span>
                      <span id={style.phone} className={style.items}>
                        {item.phone}
                      </span>
                      <span id={style.password} className={style.items}>
                        {item.password}
                      </span>
                      <select
                        className={style.choice}
                        onChange={(e) => handleUser(e)}
                      >
                        <option
                          id={style.role}
                          className={style.items && style.choices}
                        >
                          {" "}
                          {item.role}{" "}
                        </option>
                        {item.role === "ADMIN" ? (
                          <option className={style.choices} name="admin">
                            USER
                          </option>
                        ) : (
                          ""
                        )}
                        {item.role === "ADMIN" ? (
                          <option className={style.choices} name="admin">
                            MANAGER
                          </option>
                        ) : (
                          ""
                        )}
                        {item.role === "USER" ? (
                          <option className={style.choices} name="admin">
                            MANAGER
                          </option>
                        ) : (
                          ""
                        )}
                        {item.role === "MANAGER" ? (
                          <option className={style.choices} name="admin">
                            USER
                          </option>
                        ) : (
                          ""
                        )}
                        {item.role === "USER" || item.role === "MANAGER" ? (
                          <option className={style.choices} name="admin">
                            ADMIN
                          </option>
                        ) : (
                          ""
                        )}
                      </select>
                      {/* Удалить */}
                      <button
                        className={style.saveRole}
                        onClick={async () => {
                          let formData = [];
                          formData.push("status", `${item.id}`, `${listUser}`, "UPDATE Users SET role=? WHERE id=?");
                          try {
                            const res = await api.post("/client", formData, {
                              headers: {
                                "Content-Type": "multipart/form-data",
                              },
                            });
                            console.log(res);
                          } catch (err) {
                            setError(err.message);
                          }
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="55"
                          height="35"
                          viewBox="0 0 449 451"
                          fill="none"
                        >
                          <rect
                            id={style.colorSvg}
                            x="17"
                            y="17"
                            width="415"
                            height="417"
                            rx="50"
                            fill="#9795FF"
                            stroke="black"
                            stroke-width="34"
                          />
                          <rect
                            x="120"
                            y="17"
                            width="209"
                            height="131"
                            fill="white"
                            stroke="black"
                            stroke-width="34"
                          />
                          <line
                            x1="137.999"
                            y1="216.833"
                            x2="138.999"
                            y2="318.833"
                            stroke="black"
                            stroke-width="34"
                          />
                          <line
                            x1="224.999"
                            y1="216.833"
                            x2="225.999"
                            y2="318.833"
                            stroke="black"
                            stroke-width="34"
                          />
                          <line
                            x1="311.999"
                            y1="216.833"
                            x2="312.999"
                            y2="318.833"
                            stroke="black"
                            stroke-width="34"
                          />
                        </svg>
                      </button>
                      {/* Удалить */}
                      <button
                            className={style.saveRole}
                            onClick={async () => {
                              let formData = [];
                              formData.push("delete", `${item.id}`, "DELETE FROM Users WHERE id=?" );
                              try {
                                const res = await api.post(
                                  "/client",
                                  formData,
                                  {
                                    headers: {
                                      "Content-Type": "multipart/form-data",
                                    },
                                  }
                                );
                                console.log(res);
                              } catch (err) {
                                setError(err.message);
                              }
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="55"
                              height="35"
                              viewBox="0 0 455 446"
                              fill="none"
                            >
                              <path
                                d="M68.401 17H386.458C417.404 17 441.218 44.336 436.977 74.9893L394.089 384.989C390.599 410.215 369.036 429 343.57 429H110.537C85.0249 429 63.4377 410.148 60.0016 384.869L17.8657 74.8689C13.7044 44.254 37.5046 17 68.401 17Z"
                                fill="#DF6262"
                                stroke="black"
                                stroke-width="34"
                              />
                              <path
                                d="M183 255H272"
                                stroke="black"
                                stroke-width="32"
                                stroke-linecap="round"
                              />
                              <path
                                d="M147 319H308"
                                stroke="black"
                                stroke-width="32"
                                stroke-linecap="round"
                              />
                              <path
                                d="M139 133C109.124 115.074 66.4168 67.0239 46.7126 43.8494C42.3561 38.7257 46.0196 31 52.7451 31H401.686C408.814 31 412.376 39.5851 407.307 44.5951C382.662 68.9525 331.665 118.814 313 133C288 152 179 157 139 133Z"
                                fill="#663E3E"
                                stroke="black"
                                stroke-width="34"
                              />
                            </svg>
                          </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className={style.check}>
                <div className={style.formsUsers}>
                  {props[1].form.map((item) => (
                    <div id={item.id} className={style.listForms}>
                      <img
                        className={style.imageForms}
                        alt="image_form"
                        src={require(`../../../../../server/fileForUsers/${item.photo}`)}
                      ></img>

                      <div style={{ display: "flex" }}>
                        <div className={style.dateForm}>
                          <span id={style.name} className={style.itemsForm}>
                            Имя: {item.firstname}
                          </span>
                          <span id={style.phone} className={style.itemsForm}>
                            Фамилия: {item.lastname}
                          </span>
                          <span id={style.password} className={style.itemsForm}>
                            Телефон: {item.phone}
                          </span>
                          <span id={style.mail} className={style.itemsForm}>
                            Почта: {item.mail}
                          </span>
                          <select id={style.mail} className={style.itemsForm} onChange={(e) => handleForms(e)}>
                            <option className={style.choices}>
                              {" "}
                              {item.status}
                            </option>
                            {item.status === "На рассмотрении" ? (
                              <option className={style.choices} name="admin">
                                С вами скоро свяжутся
                              </option>
                            ) : (
                              ""
                            )}
                            {item.status === "С вами скоро свяжуться" ? (
                              <option className={style.choices} name="admin">
                                На рассмотрении
                              </option>
                            ) : (
                              ""
                            )}
                            {item.status === "С вами скоро свяжуться" ||
                            item.status === "На рассмотрении" ? (
                              <option className={style.choices} name="admin">
                                Отклонено
                              </option>
                            ) : (
                              ""
                            )}
                          </select>
                        </div>
                        <div className={style.controlForm}>

                          {/* Обновить */}
                          <button
                            className={style.saveRole}
                            onClick={async () => {
                              let formData = [];
                              formData.push(`"status", ${item.id}`, `${listForms}`, "UPDATE forms SET status=? WHERE id=?");
                              try {
                                const res = await api.post(
                                  "/client",
                                  formData,
                                  {
                                    headers: {
                                      "Content-Type": "multipart/form-data",
                                    },
                                  }
                                );
                                console.log(res);
                              } catch (err) {
                                setError(err.message);
                              }
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="55"
                              height="35"
                              viewBox="0 0 449 451"
                              fill="none"
                            >
                              <rect
                                id={style.colorSvg}
                                x="17"
                                y="17"
                                width="415"
                                height="417"
                                rx="50"
                                fill="#9795FF"
                                stroke="black"
                                stroke-width="34"
                              />
                              <rect
                                x="120"
                                y="17"
                                width="209"
                                height="131"
                                fill="white"
                                stroke="black"
                                stroke-width="34"
                              />
                              <line
                                x1="137.999"
                                y1="216.833"
                                x2="138.999"
                                y2="318.833"
                                stroke="black"
                                stroke-width="34"
                              />
                              <line
                                x1="224.999"
                                y1="216.833"
                                x2="225.999"
                                y2="318.833"
                                stroke="black"
                                stroke-width="34"
                              />
                              <line
                                x1="311.999"
                                y1="216.833"
                                x2="312.999"
                                y2="318.833"
                                stroke="black"
                                stroke-width="34"
                              />
                            </svg>                       
                          </button>

                          {/* Удалить */}
                          <button
                            className={style.saveRole}
                            onClick={async () => {
                              let formData = [];
                              formData.push("delete", `${item.id}`, "DELETE FROM forms WHERE id=?" );
                              try {
                                const res = await api.post(
                                  "/client",
                                  formData,
                                  {
                                    headers: {
                                      "Content-Type": "multipart/form-data",
                                    },
                                  }
                                );
                                console.log(res);
                              } catch (err) {
                                setError(err.message);
                              }
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="55"
                              height="35"
                              viewBox="0 0 455 446"
                              fill="none"
                            >
                              <path
                                d="M68.401 17H386.458C417.404 17 441.218 44.336 436.977 74.9893L394.089 384.989C390.599 410.215 369.036 429 343.57 429H110.537C85.0249 429 63.4377 410.148 60.0016 384.869L17.8657 74.8689C13.7044 44.254 37.5046 17 68.401 17Z"
                                fill="#DF6262"
                                stroke="black"
                                stroke-width="34"
                              />
                              <path
                                d="M183 255H272"
                                stroke="black"
                                stroke-width="32"
                                stroke-linecap="round"
                              />
                              <path
                                d="M147 319H308"
                                stroke="black"
                                stroke-width="32"
                                stroke-linecap="round"
                              />
                              <path
                                d="M139 133C109.124 115.074 66.4168 67.0239 46.7126 43.8494C42.3561 38.7257 46.0196 31 52.7451 31H401.686C408.814 31 412.376 39.5851 407.307 44.5951C382.662 68.9525 331.665 118.814 313 133C288 152 179 157 139 133Z"
                                fill="#663E3E"
                                stroke="black"
                                stroke-width="34"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Client;
