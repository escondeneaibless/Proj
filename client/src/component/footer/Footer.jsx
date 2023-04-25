import React from "react";
import style from "./Footer.module.css";

const Footer = () => {
  return (
    <>
      <div className={style.footer}>
        <div className={style.footer_line}>
          <div className={style.logo}></div>
          <div className={style.header_contact}>
            <div className={style.contact_items}>
              <div className={style.contact_item_vk}></div>
            </div>
            <div className={style.contact_items}>
              <div className={style.contact_item_wsp}></div>
            </div>
            <div className={style.contact_items}>
              <div className={style.contact_item_phone}></div>
            </div>
          </div>
          <ul className={style.footer_list}>
            <li>О нас</li>
            <li>Контакты</li>
            <li>Отзывы</li>
            <li>Где нас найти</li>
            <li id={style.back}>Рекомендации</li>
          </ul>
        </div>
        <p>© Copyright 2023, «HomEpair», Ковылкино</p>
      </div>
    </>
  );
};

export default Footer;
