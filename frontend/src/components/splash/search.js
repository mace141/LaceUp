import React from "react";
import { Link, Redirect } from "react-router-dom";
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
      displayDrop: "none",
      enterClickRedirect: false,
    };
    this.dispDrop = this.dispDrop.bind(this);
    this.unDispDrop = this.unDispDrop.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      filtered: this.props.parks,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.parks,
    });
  }

  handleChange(e) {
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = this.props.parks;
      newList = currentList.filter((park) => {
        const lc = park.name.toLowerCase();
        const filter = e.target.value.toLowerCase();

        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = this.props.parks;
    }
    // Set the filtered state based on what our rules added to newList
    this.setState({
      filtered: newList,
    });
  }

  dispDrop() {
    const { displayDrop } = this.state;
    this.setState({ displayDrop: "inline-block" });
  }
  unDispDrop() {
    const { displayDrop } = this.state;
    this.setState({ displayDrop: "none" });
  }

  handleEnterClick = (e) => {
    const { filtered } = this.state;
    if (e.key === "Enter") {
      console.log("enter click");
      if (filtered.length > 0) {
        console.log(filtered[0].name);
        this.setState({ enterClickRedirect: true });
      }
      console.log("no items in filter");
    }
  };

  render() {
    const { filtered, enterClickRedirect } = this.state;
    return (
      <div className="silent-click" onClick={() => console.log("click off")}>
        <h1 className="app-header">Looking for a casual pickup game? LaceUp has you covered!</h1>
        <h1 className="app-header-two">Join today to find local sporting events </h1>
        <h1 className="app-header-two">that need YOU on their team. </h1>
        <h1 className="app-header-three">Sign in, meet up, LaceUp.</h1>
        <br />
        <div className="search-bar-container">
          {enterClickRedirect ? (
            <Redirect
              to={{
                pathname: "/explore",
                state: { selectedPlace: filtered[0] },
              }}
            />
          ) : null}
          <input
            type="text"
            className="search-bar-input"
            onChange={this.handleChange}
            placeholder="Search by park..."
            onFocus={this.dispDrop}
            // onBlur={this.unDispDrop}
            onKeyPress={this.handleEnterClick}
          />
          <ul
            id="search-res"
            className="search-results-ul"
            onFocus={this.dispDrop}
            onBlur={this.unDispDrop}
            style={{ display: this.state.displayDrop }}
            // display={this.state.displayDrop ? "inline-block" : "none"}
          >
            {this.state.filtered.map((park) => (
              <li key={park._id} className="search-results-li">
                <Link
                  className="search-res-link"
                  to={{
                    pathname: `/explore`,
                    state: {
                      selectedPlace: park,
                    },
                  }}
                >
                  {park.name}
                </Link>
                <span className="delete" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default Search;
