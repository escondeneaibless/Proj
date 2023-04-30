import React, { useState, useEffect } from "react";
import api from '../../../services/apiAxios'
import style from './Client.module.css';
import { Link } from "react-router-dom";
import Forms from './AdminComponents/Forms'

function Client({ props }) {
  const [backend, setBackend] = useState([]);
  const [listUser, setListUser] = useState('');
  const [listPas, setListPas] = useState('');
  const [showlist, setShowList] = useState(false);
  const [showform, setShowForm] = useState(true);
  const [error, setError] = useState(null);
  const handleUser = (e) => {
    setListUser(e.target.value);
    console.log(e.target.value);
  }

  // const handleRoleUpload = async () => {
  //   let formData = [];
  //   formData.push(listUser);
  //   try {
  //     const res = await api.post("/client", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     console.log(res);
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  const handleList = () => {
    setShowList(false)
    setShowForm(true)
  }
  const handleForm = () => {
    setShowForm(false)
    setShowList(true)
  }

  return (
    <>
      <div className={style.block}>
        <div className={style.operation}>
          <Link to="/" className={style.opers} >Сайт</Link>
          <button className={style.opers} id={showlist ? style.list : style.list_off} onClick={handleList}>Список пользователей</button>
          <button className={style.opers} id={showform ? style.form : style.form_off} onClick={handleForm}>Формы заявок</button>
        </div>
        <div className={style.list}>
          <div className={style.prokrutka}>
            {showform ?
              <div className={style.forms}>
                <div style={{ display: "flex", marginBottom: "20px", fontWeight: "bold", fontSize: "20px" }}>
                  <span style={{ width: "215px" }}>Имя</span>
                  <span style={{ width: "215px" }}>Номер</span>
                  <span style={{ width: "215px" }}>Пароль</span>
                  <span style={{ width: "215px" }}>Роль</span>
                </div>
                <div>{props[0].user.map(item =>
                  <div id={item.id} className={style.listUsers}>
                    
                    <span id={style.name} className={style.items}>{item.name}</span>
                    <span id={style.phone} className={style.items}>{item.phone}</span>
                    <span id={style.password} className={style.items}>{item.password}</span>

                    <select className={style.choice} onChange={(e) => handleUser(e)}>
                      <option id={style.role} className={style.items && style.choices}> {item.role} </option>
                      {item.role === "ADMIN" ? <option className={style.choices} name="admin">USER</option> : ''}
                      {item.role === "ADMIN" ? <option className={style.choices} name="admin">MANAGER</option> : ''}
                      {item.role === "USER" ? <option className={style.choices} name="admin">MANAGER</option> : ''}                     
                      {item.role === "MANAGER" ? <option className={style.choices} name="admin">USER</option> : ''}
                      {item.role === "USER" || item.role === "MANAGER" ? <option className={style.choices} name="admin">ADMIN</option> : ''}
                    </select>
                    <button className={style.saveRole} onClick={async () => {
                        let formData = [];
                        formData.push(`${item.id}`, `${listUser}`);
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
                      }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="55" height="35" viewBox="0 0 449 451" fill="none">
                        <rect id={style.colorSvg} x="17" y="17" width="415" height="417" rx="50" fill="#9795FF" stroke="black" stroke-width="34" />
                        <rect x="120" y="17" width="209" height="131" fill="white" stroke="black" stroke-width="34" />
                        <line x1="137.999" y1="216.833" x2="138.999" y2="318.833" stroke="black" stroke-width="34" />
                        <line x1="224.999" y1="216.833" x2="225.999" y2="318.833" stroke="black" stroke-width="34" />
                        <line x1="311.999" y1="216.833" x2="312.999" y2="318.833" stroke="black" stroke-width="34" />
                      </svg>
                    </button>
                  </div>)}</div>
              </div>
              :
              <div className={style.check}>



              </div>}


          </div>
        </div>
      </div>
    </>
  )
}


export default Client;
