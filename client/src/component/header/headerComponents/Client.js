import React, { useState, useEffect } from "react";
import style from './Client.module.css';
import { Link } from "react-router-dom";
import Forms from './AdminComponents/Forms'

function Client() {
  const [backend, setBackend] = useState([]);
  const [list, setList] = useState([]);
  const [showlist, setShowList] = useState(false);
  const [showform, setShowForm] = useState(true);

  const handleList = () => {
    setShowList(false)
    setShowForm(true)
  }
  const handleForm = () => {
    setShowForm(false)
    setShowList(true)
  }

  useEffect(() => {
    // Функция для получения списка с сервера
    const fetchList = async () => {
      try {
        const response = await fetch('http://localhost:5000/client'); 
        const data = await response.json();
        setList(data);

      } catch (error) {
        console.error(error);
      }
    };
    fetchList();
  }, []);
  const listing = list[0].user;
  console.log(listing)
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
              <div style={{display: "flex", marginBottom: "20px", fontWeight: "bold", fontSize: "20px"}}>
                <p style={{width: "215px"}}>Имя</p>
                <p style={{width: "215px"}}>Номер</p>
                <p style={{width: "215px"}}>Пароль</p>
                <p style={{width: "215px"}}>Роль</p>
              </div>                  
                  <p>{listing.map(item =>               
                    <div className={style.listUsers}>
                      <p id={style.name} className={style.items}>{item.name}</p>
                      <p id={style.phone} className={style.items}>{item.phone}</p>
                      <p id={style.password} className={style.items}>{item.password}</p>
                      <p id={style.role} className={style.items}>{item.role}</p>
                  </div>)}</p>       
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
