import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RuR = () => {
  const { state } = useLocation();

  // const user = state?.data?.split(",")[0];
  const [binId, setbinId] = useState(state?.data?.split(",")[1]);
  const [binlocation, setbinlocation] = useState(state?.data?.split(",")[2]);
  const [device, setdevice] = useState("");
  const [token, settoken] = useState("");

  useEffect(() => {
    setbinId(state?.data?.split(",")[1]);
    setbinlocation(state?.data?.split(",")[2]);
    switch (binlocation) {
      case "bandra":
        setdevice("bandra_qr");
        settoken(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJEZXZpY2VDYWxsYmFja19iYW5kcmFfcXIiLCJzdnIiOiJ6YXJndW5lcy5hd3MudGhpbmdlci5pbyIsInVzciI6Inphcmd1bmVzIn0.7d1aa_mK_AQvJGz9S2zINC4A9oo6_Y0q0GI2KYYRIGk"
        );
        break;
      case "prabhadevi":
        setdevice("prabhadevi_qr");
        settoken(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJEZXZpY2VDYWxsYmFja19wcmFiaGFkZXZpX3FyIiwic3ZyIjoiemFyZ3VuZXMuYXdzLnRoaW5nZXIuaW8iLCJ1c3IiOiJ6YXJndW5lcyJ9._3_18_ehjPQGoPKF8gJ94Tuiq-6KAp-NgzFhArfQyWA"
        );

        break;
      case "dadar":
        setdevice("dadar_qr");
        break;

      default:
        break;
    }
  }, []);

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
    const key = `Bearer ${token}`;

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
      RUR Greenlife
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
export default RuR;
