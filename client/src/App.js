import React, { useState } from "react";

import './App.css';
import Header from './component/header/Header';
import Slider from './component/main/Slider';
import Menu from "./component/main/Menu";
import Footer from "./component/footer/Footer";
import Chat from "./component/main/components_for_menu/ChatMessage/ModalChat";


function App() {
  const [slide, setSlide] = useState(true)
  const handleShow = event => {
    setSlide((current) => !current);
  }

  return (
    <>
      <Header />
      <Slider />
      <Menu />
      <Footer />
      <div className="before" tabIndex={1}>
        <div className="svgChat" onClick={handleShow}>
          <svg width="40" height="40" viewBox="0 0 635 564" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6242 116C15.6242 51.9349 67.5592 0 131.624 0H518.082C582.148 0 634.082 51.935 634.082 116V359.103C634.082 423.168 582.147 475.103 518.082 475.103H131.624C115.562 475.103 100.262 471.839 86.3522 465.937L17.1353 560.179C11.3806 568.014 -0.811863 561.721 0.0426892 551.357L15.6587 361.958C15.6358 361.009 15.6242 360.058 15.6242 359.103V116ZM483.082 281C509.592 281 531.082 259.51 531.082 233C531.082 206.49 509.592 185 483.082 185C456.573 185 435.082 206.49 435.082 233C435.082 259.51 456.573 281 483.082 281ZM214.082 233C214.082 259.51 192.592 281 166.082 281C139.573 281 118.082 259.51 118.082 233C118.082 206.49 139.573 185 166.082 185C192.592 185 214.082 206.49 214.082 233ZM324.082 281C350.592 281 372.082 259.51 372.082 233C372.082 206.49 350.592 185 324.082 185C297.573 185 276.082 206.49 276.082 233C276.082 259.51 297.573 281 324.082 281Z" fill="black" />
          </svg>
        </div>
        <div className={slide ? 'chat_off' : 'chat'} method="post">
          <Chat />
        </div>

      </div>
    </>
  )
}

export default App;
