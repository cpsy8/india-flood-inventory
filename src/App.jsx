import React, { useState, input } from "react";
import data from "./data.json";
import DataTable from "./components/datatable.jsx";
import Filters from "./components/filters.jsx";
import Map from "./components/maps.jsx";
import districts_of_states from "./components/constant.jsx";
import RowDetails from "./components/info.jsx";
import "./styles.css";

const Navbar = () => (
  <div className="navbar">
    <div className="navbar-brand">
      India Flood Inventory <br />
      <span className="brand-title">
        A national geospatial database to facilitate flood research.
      </span>
    </div>
  </div>
);

const Footer = () => (
  <div className="footer">
    <div className="footer-contacts">
      Developer <br /> <br />
      Champak Swargiary, B.Tech Student <br />
      Indian Institute of Technology, Delhi <br />
      contact: <span className="email">mt1210263@iitd.ac.in</span>
      <br />
      <br />
      Dr. Manabendra Saharia, Assistant Professor, <br /> Indian Institute of
      Technology, Delhi <br />
      IMD: Dr. OP Sreejith, Head, Climate Research & Services,
      <br /> Indian Meteorological Department <br />
      contact: <span className="email">msaharia@iitd.ac.in</span>
    </div>
    <div className="footer-images">
      <div className="images">
        <img
          className="iitd-logo"
          src="./IITD_logo.png"
          alt="Indian Institute of Technology Delhi"
        />
        <img
          className="imd-logo"
          src="./IMD_logo.png"
          alt="Indian Metrological Department"
        />
        <img
          className="h-logo"
          src="./HydroSenseLogo.png"
          alt="HydroSenseIITD Logo"
        />
      </div>
    </div>
  </div>
);

const RadioButtons = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState("state");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="radio-buttons">
      <label>
        <input
          type="radio"
          value="state"
          checked={selectedOption === "state"}
          onChange={handleChange}
        />
        Show affected States
      </label>
      <label>
        <input
          type="radio"
          value="district"
          checked={selectedOption === "district"}
          onChange={handleChange}
        />
        Show affected Districts
      </label>
    </div>
  );
};

function App() {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedRow, setSelectedRow] = useState(null);
  const [highlightType, setHighlightType] = useState("state");

  const handleFilterSubmit = (filters) => {
    let newData = [...data];

    if (filters.startDate) {
      newData = newData.filter(
        (row) => new Date(row["startDate"]) >= filters.startDate
      );
    }
    if (filters.endDate) {
      newData = newData.filter(
        (row) => new Date(row["endDate"]) <= filters.endDate
      );
    }
    if (filters.selectedState) {
      newData = newData.filter(
        (row) => row["states"] === filters.selectedState.value
      );
    }
    if (filters.selectedDistrict) {
      newData = newData.filter(
        (row) => row["districts"] === filters.selectedDistrict.value
      );
    }

    setFilteredData(newData);
  };

  const handleFilterReset = () => {
    setFilteredData(data);
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const handleRadioChange = (selectedOption) => {
    setHighlightType(selectedOption);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="filter-section">
          <h4 className="header">Apply filter to the Data</h4>
          <Filters
            states={Object.keys(districts_of_states).map((state) => ({
              label: state,
              value: state,
            }))}
            districts_of_states={districts_of_states}
            onSubmit={handleFilterSubmit}
            onReset={handleFilterReset}
          />
        </div>
        <div className="content">
          <div className="table-box">
            <div className="table-header-box">
              <div className="box-header"> Data Table</div>
              <div className="data-interaction">
                <a
                  href="https://zenodo.org/api/records/11275211/files-archive"
                  className="download-button"
                >
                  Download
                </a>
                <a
                  href="https://zenodo.org/doi/10.5281/zenodo.4742142"
                  className="info-button"
                >
                  More Info
                </a>
              </div>
            </div>
            <div className="datatable-container">
              <DataTable data={filteredData} onRowClick={handleRowClick} />
            </div>
          </div>
          <div className="content2">
            <div className="map-box">
              <div className="map-box-header">
                <div className="radio-box">
                  <RadioButtons onChange={handleRadioChange} />
                </div>
              </div>
              <div className="map-container">
                <Map selectedRow={selectedRow} highlightType={highlightType} />
              </div>
            </div>
            <div className="row-details">
              <div className="box-header">Info</div>
              <RowDetails row={selectedRow} />
            </div>
          </div>
        </div>
        <div className="details">
          <h3>
            India Flood Inventory [1967-2023]: A national geospatial database to
            facilitate comprehensive flood research
          </h3>
          <p>
            This repository hosts the India Flood Inventory with Impacts
            (IFI-Impacts) database. It contains flood event data sourced from
            the Indian Meteorological Department from 1967-2023. It has
            undergone extensive manual digitization, cleaning, and includes new
            information to make it suitable for computational research in
            hydroclimate.
          </p>
          <p>v1.0: India Flood Inventory (IFI) 1967-2016.</p>
          <p>
            v2.0: India Flood Inventory (IFI) 1967-2023. With impacts and
            district flooded area.
          </p>
          <p>
            v3.0: India Flood Inventory (IFI) 1967-2023. Updated with local
            government codes (LGD) for state and district.
          </p>
          <h4>Citations</h4>
          <p>
            IFI v1.0 publication: Saharia, M., Jain, A., Baishya, R.R., Haobam,
            S., Sreejith, O.P., Pai, D.S., Rafieeinasab, A., 2021. India flood
            inventory: creation of a multi-source national geospatial database
            to facilitate comprehensive flood research. Nat Hazards.{" "}
            <a href="https://doi.org/10.1007/s11069-021-04698-6">
              read this article
            </a>
          </p>
          <p>
            IFI v2.0 publication: Saharia, Manabendra, et al. A District Level
            Flood Severity Index for India. arXiv:2405.01602, arXiv, 1 May 2024.
            arXiv.org,. [Under Review]{" "}
            <a href="https://doi.org/10.48550/arXiv.2405.01602">
              read this article
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
