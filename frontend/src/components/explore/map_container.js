import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import ExploreIndexItemContainer from "./explore_index/explore_index_item_container";
import EventIndexContainer from "./event_explore/event_index_container";
// const mapheight = window.windowHeight - 56;

const events = {};
const LoadingContainer = () => <div className="map-container-div"></div>;

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlace: {},
      activeMarker: null,
    };
  }
  componentDidMount() {
    // this.props.fetchParks();
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props.park,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    // debugger;
    const { parks } = this.props;
    const { activeMarker, selectedPlace } = this.state;
    return (
      <div className="explore-page-container">
        <div className="explore-side-window">
          {activeMarker ? (
            <>
              <EventIndexContainer park={selectedPlace} />
              <div className="explore-index-item">
                <button className="add-an-event-btn">Add an event</button>
              </div>
            </>
          ) : (
            parks.map((key, i) => {
              return <ExploreIndexItemContainer key={key._id} park={key} />;
            })
          )}
        </div>

        <Map
          id="map"
          containerStyle={{
            position: "relative",

            display: "inline-block",
            height: `${window.innerHeight - 60}px`,
            width: "100%",
          }}
          google={this.props.google}
          onClick={this.onMapClicked}
          // mapId="cd6df84189302f98"
          zoom={13}
          // style={defaultMapStyles.styles}
          initialCenter={{
            lat: 40.73061,
            lng: -73.9712,
          }}
        >
          {parks.map((park, i) => {
            // debugger;
            return (
              <Marker
                key={park._id}
                park={park}
                onClick={this.onMarkerClick}
                name={park.name}
                position={{ lat: park.lat, lng: park.lng }}
              />
            );
          })}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  LoadingContainer: LoadingContainer,
})(MapContainer);
