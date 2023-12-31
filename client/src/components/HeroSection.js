import React, { useState } from "react";
import "./HeroSection.scss"

function HeroSection({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postcode, setPostcode] = useState("");

  const handleSearchClick = () => {
    const query = {
      query: searchQuery,
      city: city,
      province: province,
      postcode: postcode,
    };
    onSearch(query);
  };

  return (
    <div className="hero-section">
      <h1>Discover Your New Life With Us!</h1>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Postcode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-primary mb-2"
              onClick={handleSearchClick}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
