import React from "react";
import style from "./Business.module.css";

const Business = () => {
  return (
    <>
      <div className={style.business_block}>
        <div className={style.company_info}>
          <p>
            Компания «Кронвест» является ведущим подрядчиком в сфере
            строительно-монтажных и отделочных работ в Саранске. Наши
            специалисты имеют большой опыт в строительстве и ремонте зданий
            различных типов и размеров. Мы предлагаем широкий спектр услуг,
            включая проектирование, монтаж, отделку и обслуживание. Вы можете
            быть уверены в том, что вы получите профессиональный результат,
            соответствующий вашим ожиданиям.
          </p>
        </div>
        <div className={style.bus_card}>
          <h1>HomEpairs в Ковылкино</h1>
          <p>430001, Россия, Мордовия, г. Ковылкино, Пушкина, 1</p>
          <table>
            <tr>
              <td>Телефон:</td>
              <td>8-902-667-22-46</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>zhenyakornil6@gmail.com</td>
            </tr>
            <tr>
              <td>Консультация:</td>
              <td><a href="#3" style={{color: 'black'}}>бесплатно</a></td>
            </tr>
            <tr>
              <td>Вызвать мастера:</td>
              <td><a href="#3" style={{color: 'black'}}>бесплатно</a></td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

export default Business;
