import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import ExploreIndexItemContainer from "./explore_index/explore_index_item_container";
import EventIndexContainer from "./event_explore/event_index_container";

const events = {};
const LoadingContainer = () => <div className="map-container-div"></div>;

class MapContainer extends Component {
  constructor(props) {
    super(props);
    if (!!props.preSelected) {
      this.state = {
        selectedPlace: props.preSelected,
        activeMarker: true,
      };
    } else {
      this.state = {
        selectedPlace: {},
        activeMarker: null,
      };
    }
  }
  componentDidMount() {}

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
    const { parks } = this.props;
    const { activeMarker, selectedPlace } = this.state;
    if (!parks) return null;
    else {
      return (
        <div className="explore-page-container">
          <div className="explore-side-window">
            {activeMarker ? null : (
              <h1 className="side-window-header">Parks on LaceUp</h1>
            )}
            {activeMarker ? (
              <EventIndexContainer park={selectedPlace} />
            ) : (
              Object.entries(parks).map((key, i) => {
                return <ExploreIndexItemContainer key={key[0]} park={key[1]} />;
              })
            )}
          </div>

          <Map
            id="map"
            containerStyle={{
              position: "relative",
              width: "75%",
              display: "inline-block",
              width: "100%",
              height: `${window.innerHeight - 60}px`,
            }}
            google={this.props.google}
            onClick={this.onMapClicked}
            // mapId="cd6df84189302f98"
            zoom={13}
            // style={defaultMapStyles.styles}
            initialCenter={{
              lat: 40.671,
              lng: -73.9999,
            }}
          >
            {Object.entries(parks).map((key, i) => {
              return (
                <Marker
                  key={key[1]._id}
                  park={key[1]}
                  onClick={this.onMarkerClick}
                  name={key[1].name}
                  position={{ lat: key[1].lat, lng: key[1].lng }}
                />
              );
            })}

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div>
                <div>
                  <h1>{this.state.selectedPlace.name}</h1>
                </div>
              </div>
            </InfoWindow>
          </Map>
        </div>
      );
    }
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  LoadingContainer: LoadingContainer,
})(MapContainer);
