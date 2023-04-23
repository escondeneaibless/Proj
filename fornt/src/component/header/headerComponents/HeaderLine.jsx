import React, { useState } from "react";
import style from "../Header.module.css";
import { useScrollTo } from "react-use-window-scroll";

const HeaderLine = () => {
  const [show, setShow] = useState(false);
  const scrollTo = useScrollTo();

  const handleClick = (event) => {
    setShow((current) => !current);
  };

  const [showResults, setShowResults] = useState(false);
  const onClick = () => setShowResults(true);

  return (
    
  );
};

export default HeaderLine;
