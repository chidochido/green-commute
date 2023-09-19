import React from "react";
import { useNavigate } from "react-router-dom";

import classes from "./StartLayout.module.css";
import BtnSend from "./ui/BtnSend";

const StartLayout = () => {
  const navigate = useNavigate();
  function start(event) {
    event.preventDefault();
    navigate("/login");
  }

  return (
    <div className={classes.center}>
      <form onSubmit={start}>
        START
        <BtnSend />
      </form>
    </div>
  );
};

export default StartLayout;
