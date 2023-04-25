import React from "react";
import style from "./Menu.module.css";
import Business from "./components_for_menu/BusinessCard";
import FAQ from "./components_for_menu/FAQ";
import Advantages from "./components_for_menu/Advantages";

const Menu = () => {
  return (
    <>
        <div className={style.buss}>
          <Business />
        </div>
        <div className={style.advantages}>
          <Advantages />
        </div>
        <div className={style.menu_content}>
          <FAQ />

        </div>
        
    </>
  );
};

export default Menu;
