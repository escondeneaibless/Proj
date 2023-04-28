import React, { useState, useEffect } from "react";
import style from './Client.module.css';
import {Link} from "react-router-dom";
import Forms from './AdminComponents/Forms'

function Client() {
  const [backend, setBackend] = useState([]);
  // const [check, setCheck] = useState(false);
  // const [list, setList] = useState(false);
  // const showCheck = () => {
    
  // }
  // const showList = () => {

  // }
  useEffect(() => {
    fetch("/client")
      .then((response) => response.json())
      .then((data) => {
        setBackend(data);
      });
  }, []);

  function func() {
    let mas = [];
    for (let i=0; i<backend.length; i++) {
      let a= <div className="User">
        <button className="Delete"><svg width="25" height="20" viewBox="0 0 291 434" fill="none">
      </svg></button>{backend[i]}</div>;
      mas.push(a);
    }
    return mas;
  }
  console.log(backend)
  return (
    <>
      <div className={style.block}>
        <div className={style.operation}>
          <Link to="/" className={style.opers} >Сайт</Link>
          <button className={style.opers} >Формы заявок</button>
          <button className={style.opers} >Список пользователей</button>
        </div>
        <div className={style.list}>
          <div className={style.prokrutka}>
              <div className={style.forms}>
              <div style={{display:"grid", width:"100%", placeContent:"center"}}>
                {typeof backend === "undefined" ? (
                  <p>Loading...</p>
                ) : (
                  <p className="Users">{func()}</p> //вывод массива с данными
                )}
              </div>
              </div>
              <div className={style.check}>
                  
              </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Client;
