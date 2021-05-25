import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
// const keys = require("../../../../config/keys");
// import { API_KEY } from "../../index";
const mapStyles = {
  width: "100%",
  height: "100%",
};

class MapContainer extends Component {
  render() {
    return (
      <>
        <Map
          className={`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
          // className={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          google={this.props.google}
          zoom={13}
          style={mapStyles}
          initialCenter={{
            lat: 40.73061,
            lng: -73.935242,
          }}
        />
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapContainer);
