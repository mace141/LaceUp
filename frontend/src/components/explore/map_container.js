import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const containerStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
};

class MapContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // this.props.fetchEvent();
  }
  render() {
    const { events } = this.props;

    return (
      <>
        <Map
          id="map"
          containerStyle={containerStyle}
          google={this.props.google}
          // mapId="cd6df84189302f98"
          zoom={13}
          // style={defaultMapStyles.styles}
          initialCenter={{
            lat: 40.73061,
            lng: -73.935242,
          }}
        >
          <Marker
            name={"Tompkins Square Park"}
            onClick={() => console.log("Tompkins")}
            position={{ lat: 40.7264, lng: -73.9818 }}
          />

          {/* {Object.keys(events).map((key, i) => {
            return <Marker key={key} />;
          })} */}
        </Map>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapContainer);
