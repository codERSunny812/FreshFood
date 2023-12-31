import React from "react";
import "./Shimmer.css";
const Shimmer = () => {
  return (
    <div className="bodyCard">
      {Array(6)
        .fill("")
        .map(() => (

          <div className="shimmerCard" key={Math.random()}>
            <div className="img"></div>
            <div className="name"></div>
            <div className="avgrating"></div>
            <div className="delivarytime"></div>
            <div className="cuisines"></div>
            <div className="areaName"></div>
          </div>
        ))}{" "}
    </div>
  );
};



export default Shimmer;
