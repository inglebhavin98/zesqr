import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Success from "./success/success";
import Error from "./error/error";
import QRscanner from "./qrscanner/QRscanner";
import Landing from "./landing";
import RuR from "./users/rur";
import Milkbag from "./users/milkbag";
import Goa from "./users/goa";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />

        <Route exact path="/scanner" element={<QRscanner />} />

        <Route exact path="/success" element={<Success />} />

        <Route exact path="/error" element={<Error />} />

        <Route exact path="/rur" element={<RuR />} />

        <Route exact path="/milkbag" element={<Milkbag />} />

        <Route exact path="/goa" element={<Goa />} />
      </Routes>
    </Router>
  );
}
