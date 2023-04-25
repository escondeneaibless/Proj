import React from "react";
import style from "./Slider.module.css";
import FormSlider from "./components_for_menu/sliderform/FormForSlider";
import {
  Route,
  Link,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";

const Slider = (props) => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Form />}>
        <Route path="/form_edit" element={<FormSlider />} />
      </Route>
    )
  );
 
  return (
    <>
      <div className={style.slider}>
        <div className={style.slides}>
          <div className={style.main_slider}>
            <div className={style.image}>
              <div className={style.image_one}></div>
            </div>
          </div>
          <div className={style.main_slider}>
            <div className={style.image}>
              <div className={style.image_two}></div>
            </div>
          </div>
          <div className={style.main_slider}>
            <div className={style.image}>
              <div className={style.image_three}></div>
            </div>
          </div>
        </div>
        <div className={style.switch}>
          <ul>
            <li>
              <div className={style.on}></div>
            </li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className={style.slider_form}>
          <div className={style.form_active}>
            <h1>
              Заявка на ремонт квартиры<br></br>
              <b>от 2 900 руб</b>&nbsp;за м<sup>2</sup>&nbsp;работы
            </h1>
            <p className={style.header_form}>
              После ремонта мы вывезем мусор и начисто уберем территорию
            </p>
          </div>
        </div>
      </div>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  );
};

const Form = () => {
  return (
    <>
      <div>
        <Link to="form_edit">
          <button className={style.btn_slider} id='Me'>Отправить</button>
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Slider;
