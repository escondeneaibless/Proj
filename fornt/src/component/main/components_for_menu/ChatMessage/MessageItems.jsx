import React from "react";
import style from './MessageItems.module.css';

const Messages = (props) => {
    return (
        <>
        <div className={style.message}>
            <p className={style.text}>{props.text}</p>
        </div>
        </>
    )
}

export default Messages