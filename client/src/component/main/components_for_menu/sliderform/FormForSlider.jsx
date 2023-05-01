import React, { useState, useRef } from "react";
import api from '../../../../services/apiAxios';
import style from "../../Slider.module.css";
import userPhoto from "../../../../imageForUsers/photo3.jpg";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

const FormSlider = () => {
  const [selectedFile, setSelectFile] = useState(null);
  const [uploaded, setUploaded] = useState();
  const filePicker = useRef(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setUploaded(URL.createObjectURL(e.target.files[0]));
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('phone', phone);
    formData.append('mail', mail);
    
   

    try {
      const res = await api.post("/form_edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // setUploaded(formData.image)
      console.log(res);
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handlePick = () => {
    filePicker.current.click();
  };

  const navigate = useNavigate();
  const [stateFirst, setStateFirst] = useState(true);
  const [stateLast, setStateLast] = useState(true);
  const [statePhone, setStatePhone] = useState(true);
  const [stateEmail, setStateEmail] = useState(true);

  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");

  const [inputs, setInputs] = useState({});

  const firstHandler = (e) => {
    setFirst(e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    if (e.target.value == 0) {
      setStateFirst(true);
    } else {
      setStateFirst(false);
    }
  };

  const lastHandler = (e) => {
    setLast(e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    if (e.target.value == 0) {
      setStateLast(true);
    } else {
      setStateLast(false);
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

  const mailHandler = (e) => {
    setMail(e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    if (e.target.value == 0) {
      setStateEmail(true);
    } else {
      setStateEmail(false);
    }
  };

  return (
    <>
      <div className={style.formEdit}>
        <div className={style.formContain_edit}>
          <div className={style.editForm}>
            <div
              className={style.close}
              tabIndex={1}
              onClick={() => navigate(-1)}
            ></div>
            <h1>
              Заявка на ремонт квартиры<br></br>
              <b>от 2 900 руб</b>&nbsp;за м<sup>2</sup>&nbsp;работы
            </h1>
            <p className={style.header_form_form}>
              После ремонта мы вывезем мусор и начисто уберем территорию
            </p>
          </div>
          <div className={style.editImage}>
            <div>
              <form className={style.box_input} action="" method="POST">
                <input
                  className={style.input_form}
                  id={style.one}
                  onChange={(e) => firstHandler(e)}
                  value={firstName}
                  name="firstName"
                  type="text"
                />
                <label
                  className={
                    stateFirst ? style.first_name : style.first_name_off
                  }
                >
                  Имя
                </label>
                <input
                  className={style.input_form}
                  id={style.two}
                  onChange={(e) => lastHandler(e)}
                  value={lastName}
                  name="lastName"
                  type="text"
                />
                <label
                  className={stateLast ? style.last_name : style.last_name_off}
                >
                  Фамилия
                </label>
                <InputMask
                  mask="+7(999)-999-99-99"
                  className={style.input_form}
                  id={style.three}
                  onChange={(e) => phoneHandler(e)}
                  value={phone}
                  name="userPhone"
                  type="text"
                />
                <label className={statePhone ? style.phone : style.phone_off}>
                  Телефон
                </label>
                <input
                  className={style.input_form}
                  id={style.four}
                  onChange={(e) => mailHandler(e)}
                  value={mail}
                  name="userMail"
                  type="text"
                />
                <label className={stateEmail ? style.mail : style.mail_off}>
                  E-mail
                </label>
              </form>
            </div>

            {/* Загрузка фото */}
             <div className={style.box_image}>
              {/* <button className={style.edit_image_btn} onClick={handleImageUpload}>
                Загрузить
              </button> */}
              <button onClick={handlePick}>Выбрать изображение</button>
              <input
                type="file"
                className={style.image_edit}
                id="image"
                ref={filePicker}
                onChange={handleImageChange}
                accept="image/*,.png,.jpg"
              /> 
             
              {error && <p>Error: {error}</p>}
              <div className={style.loading_image}>
                <img
                  className={style.imageEdit}
                  id="image2"
                  alt="your imaged"
                  src= {uploaded || userPhoto}
                />
              </div>
              {/* <button className={style.edit_image_btn}>Сохранить</button> */}
            </div>
            {/* Загрузка фото */}
            {uploaded && (
              <div>
                <h2>{uploaded.filename}</h2>
                <img src={uploaded.filePath} alt="" width="200" />
              </div>
            )}
          </div>
          <div className={style.box_enter}>
            <input type="checkbox" className={style.form_check} />
            <p className={style.chekForm}>
              я принимаю&nbsp;<a href="">условия передачи информации</a>
            </p>
            <button
              onClick={handleImageUpload}
              className={style.btn_slider_box}
            >
              Отправить
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormSlider;
