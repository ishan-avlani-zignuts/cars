// this component is for UI only.....not for backend use
import React from "react";

import image3 from "../assets/images/image3.jpg";
import image4 from "../assets/images/image4.jpg";
import image5 from "../assets/images/image5.jpg";
import image6 from "../assets/images/image6.jpg";
function Carcards() {
  return (
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-md-4 g-4">
        <div className="col mb-4">
          <div className="card h-100">
            <img src={image3} className="card-img-top" alt="Placeholder" />
            <div className="card-body">
              <h5 className="card-title">Mercedes</h5>
              <button className="btn btn-primary">Book</button>
            </div>
          </div>
        </div>

        <div className="col mb-4">
          <div className="card h-100">
            <img src={image4} className="card-img-top" alt="Placeholder" />
            <div className="card-body">
              <h5 className="card-title">Baleno</h5>
              <button className="btn btn-primary">Book</button>
            </div>
          </div>
        </div>

        <div className="col mb-4">
          <div className="card h-100">
            <img src={image5} className="card-img-top" alt="Placeholder" />
            <div className="card-body">
              <h5 className="card-title">Creta</h5>
              <button className="btn btn-primary">Book</button>
            </div>
          </div>
        </div>

        <div className="col mb-4">
          <div className="card h-100">
            <img src={image6} className="card-img-top" alt="Placeholder" />
            <div className="card-body">
              <h5 className="card-title">Tesla</h5>
              <button className="btn btn-primary">Book</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carcards;
