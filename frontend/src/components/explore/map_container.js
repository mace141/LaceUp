import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
require("dotenv").config();

const mapStyles = {
  width: "100%",
  height: "100%",
};

class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={13}
        style={mapStyles}
        initialCenter={{
          lat: 40.73061,
          lng: -73.935242,
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapContainer);
