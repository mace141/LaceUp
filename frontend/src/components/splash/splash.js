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
import SplashFooter from "./splash_footer";
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
            totalSlides={4}
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
            <div>
              <SplashFooter />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;
