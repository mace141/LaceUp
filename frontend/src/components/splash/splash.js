import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import SearchContainer from "./search_container";
import splash0 from "../../style/assets/splash0.jpeg";
import splash1 from "../../style/assets/splash1.jpeg";
import splash2 from "../../style/assets/splash2.jpg";
class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchParks();
  }

  render() {
    const { openModal, parks } = this.props;

    return (
      <div className="splash-page-whole">
        <div className="search-comp-container">
          <SearchContainer parks={parks} />
        </div>
        <div className="carousel-container">
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={3}
            height="inherit"
            isPlaying={true}
          >
            <Slider>
              <Slide index={0}>
                <img className="landing-image" src={splash0} />
              </Slide>
              <Slide index={1}>
                <img className="landing-image" src={splash1} />
              </Slide>
              <Slide index={2}>
                <img className="landing-image" src={splash2} />
              </Slide>
            </Slider>
          </CarouselProvider>
        </div>
        <div className="splash-under">
          <div className="splash-search">
            <input
              id="splash-search-bar"
              type="search"
              placeholder="Search for events near you"
            />
            <span className="splash-or">or</span>
            <button
              className="splash-btn"
              id="splash-upload"
              onClick={() => openModal("login")}
            >
              Host your own
            </button>
          </div>
          <div className="splash-banner">
            <h1 className="splash-explore-ask">
              See what's happening near you
            </h1>
          </div>
          <div className="splash-grid-trending"></div>

          <div className="splash-thanks">
            <h2>Boiler plate boiler plate</h2>
            <button
              id="create-act"
              className="splash-btn"
              onClick={() => openModal("signup")}
            >
              Create account
            </button>
            <div className="have-act">
              <span>Already have an account?</span>
              <button
                className="splash-sign-in"
                onClick={() => openModal("login")}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;
