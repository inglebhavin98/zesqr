import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Milkbag = () => {
  const { state } = useLocation();
  const [binId, setbinId] = useState(state?.data?.split(",")[1]);
  const [binlocation, setbinlocation] = useState(state?.data?.split(",")[2]);
  const [device, setdevice] = useState("");

  useEffect(() => {
    setbinId(state?.data?.split(",")[1]);
    setbinlocation(state?.data?.split(",")[2]);
    switch (binlocation) {
      case "cuffparade":
        setdevice("mbp_cuffparade_qr");
        break;
      case "prabhadevi":
        setdevice("mbp_prabhadevi_qr");
        break;
      case "dadar":
        setdevice("mbp_dadar_qr");
        break;

      default:
        break;
    }
  });

  const [selectedOption, setselectedOption] = useState("none");
  const navigate = useNavigate();

  const onValueChange = (event) => {
    setselectedOption(event?.target?.value);
  };

  const formSubmit = (event) => {
    event.preventDefault();
    console.log("submit");
    sendData();
  };

  const sendData = () => {
    const url = `https://zargunes.aws.thinger.io/v3/users/zargunes/devices/${device}/callback/data`;
    const key =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJEZXZpY2VDYWxsYmFja19iYW5kcmFfcXIiLCJzdnIiOiJ6YXJndW5lcy5hd3MudGhpbmdlci5pbyIsInVzciI6Inphcmd1bmVzIn0.7d1aa_mK_AQvJGz9S2zINC4A9oo6_Y0q0GI2KYYRIGk";

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json;charset=UTF-8");
    myHeaders.append("Authorization", `${key}`);
    myHeaders.append("Accept", "application/json, text/plain, */*");

    const raw = `{"Value":${selectedOption}}`;

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${url}`, requestOptions).then((response) => {
      if (response.status === 200) {
        console.log("test", response);
        navigate("/success");
      } else if (response.status === 404) {
        console.log("test", response);
        navigate("/error");
      }
    });
  };

  return (
    <div>
      The Milkbag Project
      <hr style={{ marginTop: "10px" }} />
      <p>Bin Id : {binId}</p>
      <p>Location : {binlocation}</p>
      <br />
      <p>Select Fill Level</p>
      <br />
      <form onSubmit={formSubmit}>
        <div style={{ textAlign: "left" }}>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="20"
                checked={selectedOption === "20"}
                onChange={onValueChange}
                style={{ marginRight: "10px" }}
              />
              Low
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="50"
                checked={selectedOption === "50"}
                onChange={onValueChange}
                style={{ marginRight: "10px" }}
              />
              Medium
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="80"
                checked={selectedOption === "80"}
                onChange={onValueChange}
                style={{ marginRight: "10px" }}
              />
              High
            </label>
            <hr style={{ marginBottom: "10px" }} />
          </div>
        </div>
        <div style={{ marginBottom: "10px" }}>
          Selected level is : {selectedOption}
        </div>
        <button className="btn btn-default" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
export default Milkbag;
