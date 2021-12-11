import React from "react";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/scanner");
  };
  return (
    <div>
      Hello! Press below button to start
      <br />
      <br />
      <button onClick={handleRedirect}>Start</button>
    </div>
  );
};
export default Landing;
