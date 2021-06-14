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
import splash1 from "../../style/assets/splash1.jpg";
import splash2 from "../../style/assets/splash2.jpg";
import propic from "../../style/assets/propic.png";
import daniel from "../../style/assets/76175570.jpg";
import alex from "../../style/assets/77806372.jpg";
import andrew from "../../style/assets/andrew.png";

import splash3 from "../../style/assets/splash3.jpg";
class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchParks();
    this.props.fetchAllEvents();
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
            naturalSlideHeight={100}
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
                <img className="landing-image" src={splash3} />
              </Slide>
              <Slide index={3}>
                <img className="landing-image" src={splash2} />
              </Slide>
            </Slider>
          </CarouselProvider>
        </div>
        <div className="splash-under">
          <div className="splash-footer">
            <h1 className="founders">Founders:</h1>
            {/* <img className="footer-img" src="pic_trulli.jpg" alt="Daniel propic"></img> */}
            <img className="footer-img" src={daniel} alt="daniel propic"></img>
            <div className="founder-info">
              <p className="footer-name">Daniel Wu</p>
              <a
                className="footer-linkedin-git"
                href="https://www.linkedin.com/in/daniel-wu-2995a6140/"
                target="_blank"
              >
                LinkedIn
              </a>
              <a
                className="footer-linkedin-git"
                href="https://github.com/mace141"
                target="_blank"
              >
                Github
              </a>
              <a
                className="footer-site"
                href="https://www.google.com/"
                target="_blank"
              >
                Personal Site
              </a>
            </div>
            <img className="footer-img" src={alex} alt="alex propic"></img>
            <div className="founder-info">
              <p className="footer-name">Alex Kerpelman</p>
              <a
                className="footer-linkedin-git"
                href="https://www.linkedin.com/in/alexander-kerpelman-22587584/"
                target="_blank"
              >
                LinkedIn
              </a>
              <a
                className="footer-linkedin-git"
                href="https://github.com/akerpelm"
                target="_blank"
              >
                Github
              </a>
              <a
                className="footer-site"
                href="https://www.google.com/"
                target="_blank"
              >
                Personal Site
              </a>
            </div>
            <img className="footer-img" src={andrew} alt="andrew propic"></img>
            <div className="founder-info">
              <p className="footer-name">Andrew Kihs</p>
              <a
                className="footer-linkedin-git"
                href="https://www.linkedin.com/in/andrew-kihs"
                target="_blank"
              >
                LinkedIn
              </a>
              <a
                className="footer-linkedin-git"
                href="https://github.com/andrewkihs"
                target="_blank"
              >
                Github
              </a>
              <a
                className="footer-site"
                href="https://www.google.com/"
                target="_blank"
              >
                Personal Site
              </a>
            </div>
            <img className="footer-img" src={propic} alt="jack propic"></img>
            <div className="founder-info-jack">
              <p className="footer-name">Jack Cusick</p>
              <a
                className="footer-linkedin-git"
                href="https://www.linkedin.com/in/jack-cusick-2a5809b4/"
                target="_blank"
              >
                LinkedIn
              </a>
              <a
                className="footer-linkedin-git"
                href="https://github.com/jackcusick95"
                target="_blank"
              >
                Github
              </a>
              <a
                className="footer-site"
                href="https://www.google.com/"
                target="_blank"
              >
                Personal Site
              </a>
            </div>
          </div>
          {/* <div className="splash-search">
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
            </div> */}
          {/* </div> */}
        </div>
      </div>
    );
  }
}

export default Splash;
