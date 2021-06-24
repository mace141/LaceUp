import React from "react";
import propic from "../../style/assets/propic.png";
import daniel from "../../style/assets/76175570.jpg";
import alex from "../../style/assets/77806372.jpg";
import andrew from "../../style/assets/andrew.png";

const SplashFooter = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-nav">
        <div className="footer-logo"></div>

        <div className="row footer-flex">
          <div className="link-section">
            <ul>
              <p className="link-section-header">Features</p>
              <li>Sign up to host events for other players to join.</li>
              <li>
                Join existing events and get the upper hand over your opponents.
              </li>
              <li>
                Explore parks in your area to find a sport, a time, and a place
                that are perfect for you.
              </li>
              <li>Post comments in an event for even better communication.</li>
            </ul>
          </div>
          <div className="link-section">
            <ul>
              <p className="link-section-header">Technologies Used</p>
              <li>MongoDB</li>
              <li>Express.js</li>
              <li>React</li>
              <li>Redux</li>
              <li>Node.js</li>
              <li>
                <a
                  id="code-repo"
                  href="https://github.com/mace141/LaceUp"
                  target="_blank"
                >
                  Code Repository
                </a>
              </li>
            </ul>
          </div>

          <div className="link-section">
            <ul>
              <p className="link-section-header">Founders</p>
              <div className="founders">
                <div className="founder-container">
                  <img
                    className="footer-img"
                    src={daniel}
                    alt="daniel propic"
                  />
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
                      className="footer-linkedin-git"
                      href="https://www.google.com/"
                      target="_blank"
                    >
                      Personal Site
                    </a>
                  </div>
                </div>
                <div className="founder-container">
                  <img
                    className="footer-img"
                    src={alex}
                    alt="alex propic"
                  ></img>
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
                      className="footer-linkedin-git"
                      href="https://www.akerpelmandev.com/"
                      target="_blank"
                    >
                      Personal Site
                    </a>
                  </div>
                </div>
                <div className="founder-container">
                  <img
                    className="footer-img"
                    src={andrew}
                    alt="andrew propic"
                  />
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
                      className="footer-linkedin-git"
                      href="https://www.google.com/"
                      target="_blank"
                    >
                      Personal Site
                    </a>
                  </div>
                </div>
                <div className="founder-container">
                  <img
                    className="footer-img"
                    src={propic}
                    alt="jack propic"
                  ></img>
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
                      className="footer-linkedin-git"
                      href="https://www.jackcusick95.com/"
                      target="_blank"
                    >
                      Personal Site
                    </a>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashFooter;
