import React from "react";
import { useLocation } from "react-router-dom";

const Error = () => {
  const { state } = useLocation();

  console.log("data here", state);

  return <div>Please try again</div>;
};

export default Error;
