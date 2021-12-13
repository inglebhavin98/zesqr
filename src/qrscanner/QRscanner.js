import "./styles.css";
import { useState } from "react";
import QrReader from "react-qr-reader";
import { useNavigate } from "react-router-dom";

const QRscanner = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState("environment");

  const [scanned, setScanned] = useState(false);

  const handleRedirect = (data) => {
    console.log("data", data);
    const user = data?.split(",")[0];
    switch (user) {
      case "rur":
        navigate("/rur", { state: { data: data } });
        break;
      case "milkbag":
        navigate("/milkbag", { state: { data: data } });
        break;
      case "goa":
        navigate("/goa", { state: { data: data } });
        break;
      default:
        navigate("/error", { state: { data: data } });
        break;
    }
  };

  const handleScan = async (scanData) => {
    console.log(`loaded data data`, scanData);
    if (scanData !== null) {
      setScanned(true);
      handleRedirect(scanData);
    }
  };

  const handleError = (err) => {
    console.error(err);
    alert(err);
    navigate("/error");
  };

  return !scanned ? (
    <div style={{ textAlign: "-webkit-center" }}>
      <h1>
        Place the QR Code inside the{" "}
        <span style={{ color: "red" }}>red box</span>
      </h1>
      <br />
      <div>
        Select your camera :{" "}
        <select onChange={(e) => setSelected(e.target.value)}>
          <option value={"environment"}>Back Camera</option>
          <option value={"user"}>Front Camera</option>
        </select>
      </div>
      <br />

      <QrReader
        facingMode={selected}
        delay={500}
        onError={handleError}
        onScan={handleScan}
        // chooseDeviceId={()=>selected}
        style={{ width: "300px", heigth: "200px" }}
      />
    </div>
  ) : (
    <div>Scan Done</div>
  );
};

export default QRscanner;
