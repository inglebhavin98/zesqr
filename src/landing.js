import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/scanner");
  };
  return (
    <div>
      <div>
        <img
          src="https://media-exp1.licdn.com/dms/image/C510BAQEX9icPA7VWyw/company-logo_200_200/0/1567873990856?e=2159024400&v=beta&t=s9oYaHhIE1kUzRIbeytviLIu-zCVZ-3uvSetwZt5d1w"
          alt="QR scan app by ZargunES"
        />
      </div>
      <br />
      <h2>Hello! Press below button to start</h2>
      <br />

      <button onClick={handleRedirect}>Start</button>
    </div>
  );
};
export default Landing;
