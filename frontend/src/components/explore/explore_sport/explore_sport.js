import React from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import SportIndexContainer from "./sport_index_container";
import EventIndexContainer from "../event_explore/event_index_container";
import { withRouter, Link } from "react-router-dom";
const LoadingContainer = () => <div className="map-container-div"></div>;
class ExploreSport extends React.Component {
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
  componentDidMount() {
    this.props.fetchParks();
    this.props.fetchAllEvents();
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
  titleize(str) {
    if (!str.split) return str;
    const _titleizeWord = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
      },
      result = [];
    str.split(" ").forEach((word) => {
      result.push(_titleizeWord(word));
    });
    return result.join(" ");
  }
  render() {
    const { parks, sport, events } = this.props;
    const { activeMarker, selectedPlace } = this.state;
    if (!parks) return <>basketball</>;
    else {
      return (
        <div className="explore-map-outer">
          <div className="explore-page-container">
            <div className="explore-side-window">
              {activeMarker ? null : (
                <h1 className="side-window-header">
                  {this.titleize(sport)} events on LaceUp
                </h1>
              )}
              {activeMarker ? (
                <EventIndexContainer park={selectedPlace} />
              ) : (
                Object.entries(events).map((key, i) => {
                  return <SportIndexContainer key={key[0]} event={key[1]} />;
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
        </div>
      );
    }
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  LoadingContainer: LoadingContainer,
})(ExploreSport);
